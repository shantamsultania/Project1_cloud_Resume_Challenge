output "bucketDetails" {
  value = aws_s3_bucket.my_aws_bucket_example02.bucket
}
output "function_url" {
  value = aws_lambda_function_url.url1.function_name
}

