resource "aws_db_subnet_group" "this" {
  name       = "${var.project}-${var.env}-dbsub"
  subnet_ids = var.subnets
}

resource "aws_security_group" "db" {
  name   = "${var.project}-${var.env}-db-sg"
  vpc_id = var.vpc_id
}

resource "aws_db_instance" "postgres" {
  identifier = "${var.project}-${var.env}"
  engine = "postgres"
  engine_version = "16.3"
  instance_class = "db.r6g.large"
  username = var.username
  password = var.password
  allocated_storage = 100
  multi_az = true
  db_subnet_group_name = aws_db_subnet_group.this.name
  vpc_security_group_ids = [ aws_security_group.db.id ]
  publicly_accessible = false
  skip_final_snapshot = true
  performance_insights_enabled = true
  apply_immediately = true
  parameter_group_name = aws_db_parameter_group.pgvector.name
}

resource "aws_db_parameter_group" "pgvector" {
  name   = "${var.project}-${var.env}-pg16-pgvector"
  family = "postgres16"
  parameter {
    name  = "shared_preload_libraries"
    value = "pg_stat_statements,pg_trgm"
  }
}

# Note: pgvector is enabled by executing CREATE EXTENSION after connection
output "db_endpoint" { value = aws_db_instance.postgres.address }
