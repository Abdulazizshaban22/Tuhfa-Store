locals { repo_names = [for r in var.repos: "${var.project}-${var.env}-${r}"] }
resource "aws_ecr_repository" "repo" {
  for_each = toset(local.repo_names)
  name = each.value
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration { scan_on_push = true }
}
output "ecr_urls" { value = { for k, r in aws_ecr_repository.repo : k => r.repository_url } }
