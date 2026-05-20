variable "region" { type = string }
variable "project" { type = string }
variable "env" { type = string }
variable "domain_api" { type = string }  # api.tohfa.sa
variable "domain_web" { type = string }  # tohfa.sa
variable "db_username" { type = string }
variable "db_password" { type = string }
variable "db_instance_class" { type = string  default = "db.t4g.medium" }
variable "container_cpu" { type = number default = 512 }
variable "container_memory" { type = number default = 1024 }
variable "desired_count_api" { type = number default = 3 }
variable "desired_count_web" { type = number default = 3 }
variable "desired_count_ai"  { type = number default = 2 }
variable "enable_cloudfront" { type = bool   default = true }
