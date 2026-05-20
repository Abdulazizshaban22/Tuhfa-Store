# TOHFA V∞ — Go-Live on AWS (Terraform + CI/CD)
Generated: 2025-10-21 08:27

This package provisions the production infrastructure on AWS:
- VPC + Subnets + NAT
- RDS PostgreSQL 16 (+ pgvector extension)
- ECR repositories (api, web, ai)
- ECS/Fargate cluster + services (api, web, ai) behind ALB
- ACM certificates + Route53 records (optional)
- (Optional) CloudFront in front of Web ALB
- CI/CD via GitHub Actions (OIDC) to build/push images & run Terraform
- Monitoring stubs (CloudWatch Logs, optional Loki/Grafana Helm values for K8s future)

## Quick start
1) Fill `infra/terraform/env/prod.tfvars` with your domains and ARNs.
2) Configure OIDC for GitHub → AWS (follow AWS/GitHub guide).
3) Push to `main`: GitHub Actions builds images, pushes to ECR, and runs Terraform.
