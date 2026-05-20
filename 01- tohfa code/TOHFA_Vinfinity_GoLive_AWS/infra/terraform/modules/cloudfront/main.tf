resource "aws_cloudfront_origin_access_control" "oac" {
  name = "${var.project}-${var.env}-oac"
  origin_access_control_origin_type = "custom"
  signing_behavior = "never"
  signing_protocol = "sigv4"
}

resource "aws_cloudfront_distribution" "this" {
  enabled = true
  comment = "${var.project}-${var.env}-web"
  origins {
    domain_name = var.alb_dns_name
    origin_id   = "alb-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }
  default_cache_behavior {
    target_origin_id = "alb-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods  = ["GET","HEAD","OPTIONS"]
    cached_methods   = ["GET","HEAD"]
  }
  restrictions { geo_restriction { restriction_type = "none" } }
  viewer_certificate { cloudfront_default_certificate = true }
}
output "cloudfront_domain" { value = aws_cloudfront_distribution.this.domain_name }
