locals {
  api_image = "${lookup(var.ecr_urls, "tohfa-${var.env}-api", "ecr/api")}:latest"
  web_image = "${lookup(var.ecr_urls, "tohfa-${var.env}-web", "ecr/web")}:latest"
  ai_image  = "${lookup(var.ecr_urls, "tohfa-${var.env}-ai",  "ecr/ai")}:latest"
}

# API target group + service
resource "aws_lb_target_group" "api" {
  name = "${var.project}-${var.env}-api"
  port = 4000
  protocol = "HTTP"
  vpc_id = data.aws_vpc.selected.id
  target_type = "ip"
  health_check { path = "/health" }
}
data "aws_vpc" "selected" { id = regex("vpc-[a-z0-9]+", var.security_groups[0]) != null ? split("/", var.security_groups[0])[0] : null }

resource "aws_lb_listener_rule" "api" {
  listener_arn = var.alb_listener_arn
  priority     = 10
  action { type = "forward" target_group_arn = aws_lb_target_group.api.arn }
  condition { path_pattern { values = ["/api*", "/health"] } }
}

resource "aws_ecs_task_definition" "api" {
  family                   = "${var.project}-${var.env}-api"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  network_mode             = "awsvpc"
  runtime_platform { operating_system_family = "LINUX" }
  container_definitions = jsonencode([{
    name  = "api"
    image = local.api_image
    portMappings = [{ containerPort = 4000, hostPort = 4000 }]
    environment = [
      { name = "DATABASE_URL", value = "postgresql://${var.db_username}:${var.db_password}@${var.rds_endpoint}:5432/tohfa" },
      { name = "CORS_ORIGINS", value = "https://tohfa.sa" }
    ]
    essential = true
    logConfiguration = { logDriver = "awslogs", options = {
      awslogs-group = "/ecs/tohfa-api", awslogs-region = var.region, awslogs-stream-prefix = "ecs"
    } }
  }])
  execution_role_arn = aws_iam_role.ecs_task_exec.arn
  task_role_arn      = aws_iam_role.ecs_task_exec.arn
}

resource "aws_ecs_service" "api" {
  name            = "${var.project}-${var.env}-api"
  cluster         = var.cluster_arn
  launch_type     = "FARGATE"
  desired_count   = var.desired_count_api
  task_definition = aws_ecs_task_definition.api.arn
  network_configuration {
    subnets         = var.private_subnets
    security_groups = var.security_groups
    assign_public_ip = false
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "api"
    container_port   = 4000
  }
}

# WEB (Next.js on 3000)
resource "aws_lb_target_group" "web" {
  name = "${var.project}-${var.env}-web"
  port = 3000
  protocol = "HTTP"
  vpc_id = data.aws_vpc.selected.id
  target_type = "ip"
  health_check { path = "/" }
}

resource "aws_lb_listener_rule" "web" {
  listener_arn = var.alb_listener_arn
  priority     = 20
  action { type = "forward" target_group_arn = aws_lb_target_group.web.arn }
  condition { host_header { values = ["tohfa.sa", "www.tohfa.sa"] } }
}

resource "aws_ecs_task_definition" "web" {
  family                   = "${var.project}-${var.env}-web"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  network_mode             = "awsvpc"
  runtime_platform { operating_system_family = "LINUX" }
  container_definitions = jsonencode([{
    name  = "web"
    image = local.web_image
    portMappings = [{ containerPort = 3000, hostPort = 3000 }]
    environment = [
      { name = "NEXT_PUBLIC_API_BASE", value = "https://api.tohfa.sa" }
    ]
    essential = true
    logConfiguration = { logDriver = "awslogs", options = {
      awslogs-group = "/ecs/tohfa-web", awslogs-region = var.region, awslogs-stream-prefix = "ecs"
    } }
  }])
  execution_role_arn = aws_iam_role.ecs_task_exec.arn
  task_role_arn      = aws_iam_role.ecs_task_exec.arn
}

resource "aws_ecs_service" "web" {
  name            = "${var.project}-${var.env}-web"
  cluster         = var.cluster_arn
  launch_type     = "FARGATE"
  desired_count   = var.desired_count_web
  task_definition = aws_ecs_task_definition.web.arn
  network_configuration {
    subnets         = var.private_subnets
    security_groups = var.security_groups
    assign_public_ip = false
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.web.arn
    container_name   = "web"
    container_port   = 3000
  }
}

# AI (FastAPI on 5000)
resource "aws_lb_target_group" "ai" {
  name = "${var.project}-${var.env}-ai"
  port = 5000
  protocol = "HTTP"
  vpc_id = data.aws_vpc.selected.id
  target_type = "ip"
  health_check { path = "/health" }
}

resource "aws_lb_listener_rule" "ai" {
  listener_arn = var.alb_listener_arn
  priority     = 30
  action { type = "forward" target_group_arn = aws_lb_target_group.ai.arn }
  condition { path_pattern { values = ["/ai*"] } }
}

resource "aws_ecs_task_definition" "ai" {
  family                   = "${var.project}-${var.env}-ai"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  network_mode             = "awsvpc"
  runtime_platform { operating_system_family = "LINUX" }
  container_definitions = jsonencode([{
    name  = "ai"
    image = local.ai_image
    portMappings = [{ containerPort = 5000, hostPort = 5000 }]
    essential = true
    logConfiguration = { logDriver = "awslogs", options = {
      awslogs-group = "/ecs/tohfa-ai", awslogs-region = var.region, awslogs-stream-prefix = "ecs"
    } }
  }])
  execution_role_arn = aws_iam_role.ecs_task_exec.arn
  task_role_arn      = aws_iam_role.ecs_task_exec.arn
}

resource "aws_ecs_service" "ai" {
  name            = "${var.project}-${var.env}-ai"
  cluster         = var.cluster_arn
  launch_type     = "FARGATE"
  desired_count   = var.desired_count_ai
  task_definition = aws_ecs_task_definition.ai.arn
  network_configuration {
    subnets         = var.private_subnets
    security_groups = var.security_groups
    assign_public_ip = false
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.ai.arn
    container_name   = "ai"
    container_port   = 5000
  }
}

# IAM for task execution
resource "aws_iam_role" "ecs_task_exec" {
  name = "${var.project}-${var.env}-ecsTaskExec"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "ecs-tasks.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
}
resource "aws_iam_role_policy_attachment" "ecsTaskExecPolicy" {
  role       = aws_iam_role.ecs_task_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
