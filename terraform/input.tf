variable "aws_bucket_name" {

  description = "this is sample bucket name"
  type        = string
  default     = "mybucketss-new1.com"
}

variable "aws_role_arn" {

  description = "This is the AWS I AM role ARN"
  type        = string
}

variable "table_name" {
  description = "This is name of DynamoDb Table"
  type        = string
}

# added code checks

