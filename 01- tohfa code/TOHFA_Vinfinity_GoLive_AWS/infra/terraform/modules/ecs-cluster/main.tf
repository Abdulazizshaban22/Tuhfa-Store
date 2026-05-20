resource "aws_ecs_cluster" "this" {
  name = "${var.project}-${var.env}-cluster"
  setting { name = "containerInsights" value = "enabled" }
}
output "cluster_arn" { value = aws_ecs_cluster.this.arn }
