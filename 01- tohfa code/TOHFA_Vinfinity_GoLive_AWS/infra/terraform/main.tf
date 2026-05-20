module "network" {
  source = "./modules/network"
  project = var.project
  env     = var.env
}

module "db" {
  source   = "./modules/rds"
  project  = var.project
  env      = var.env
  vpc_id   = module.network.vpc_id
  subnets  = module.network.private_subnets
  username = var.db_username
  password = var.db_password
}

module "ecr" {
  source  = "./modules/ecr"
  project = var.project
  env     = var.env
  repos   = ["api","web","ai"]
}

module "cluster" {
  source    = "./modules/ecs-cluster"
  project   = var.project
  env       = var.env
  vpc_id    = module.network.vpc_id
  subnets   = module.network.private_subnets
}

module "alb" {
  source   = "./modules/alb"
  project  = var.project
  env      = var.env
  vpc_id   = module.network.vpc_id
  subnets  = module.network.public_subnets
}

module "ecs_services" {
  source  = "./modules/ecs-services"
  project = var.project
  env     = var.env
  cluster_arn = module.cluster.cluster_arn
  alb_listener_arn = module.alb.http_listener_arn
  private_subnets  = module.network.private_subnets
  security_groups  = [ module.network.default_sg_id ]
  rds_endpoint = module.db.db_endpoint
  db_username  = var.db_username
  db_password  = var.db_password
  container_cpu    = var.container_cpu
  container_memory = var.container_memory
  desired_count_api = var.desired_count_api
  desired_count_web = var.desired_count_web
  desired_count_ai  = var.desired_count_ai
  ecr_urls = module.ecr.ecr_urls
}

# Optional CloudFront in front of Web ALB
module "cloudfront" {
  source = "./modules/cloudfront"
  count  = var.enable_cloudfront ? 1 : 0
  project = var.project
  env     = var.env
  domain_web = var.domain_web
  alb_dns_name = module.alb.alb_dns_name
}
