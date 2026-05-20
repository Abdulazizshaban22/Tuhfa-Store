resource "aws_lb" "this" {
  name = "${var.project}-${var.env}-alb"
  load_balancer_type = "application"
  security_groups = []
  subnets = var.subnets
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port = 80
  protocol = "HTTP"
  default_action { type = "fixed-response" fixed_response { status_code = "404" } }
}

output "alb_arn" { value = aws_lb.this.arn }
output "alb_dns_name" { value = aws_lb.this.dns_name }
output "http_listener_arn" { value = aws_lb_listener.http.arn }
