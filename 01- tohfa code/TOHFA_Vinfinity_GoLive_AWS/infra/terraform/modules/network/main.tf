resource "aws_vpc" "this" {
  cidr_block = "10.50.0.0/16"
  tags = { Name = "${var.project}-${var.env}" }
}
resource "aws_internet_gateway" "igw" { vpc_id = aws_vpc.this.id }
resource "aws_subnet" "public_a"  { vpc_id = aws_vpc.this.id cidr_block = "10.50.0.0/20" availability_zone = "me-central-1a" map_public_ip_on_launch = true }
resource "aws_subnet" "public_b"  { vpc_id = aws_vpc.this.id cidr_block = "10.50.16.0/20" availability_zone = "me-central-1b" map_public_ip_on_launch = true }
resource "aws_subnet" "private_a" { vpc_id = aws_vpc.this.id cidr_block = "10.50.32.0/20" availability_zone = "me-central-1a" }
resource "aws_subnet" "private_b" { vpc_id = aws_vpc.this.id cidr_block = "10.50.48.0/20" availability_zone = "me-central-1b" }
resource "aws_security_group" "default" { name = "${var.project}-${var.env}-sg" vpc_id = aws_vpc.this.id }
output "vpc_id" { value = aws_vpc.this.id }
output "public_subnets" { value = [aws_subnet.public_a.id, aws_subnet.public_b.id] }
output "private_subnets" { value = [aws_subnet.private_a.id, aws_subnet.private_b.id] }
output "default_sg_id" { value = aws_security_group.default.id }
