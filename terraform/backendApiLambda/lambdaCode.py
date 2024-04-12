import json
import logging
import os

import boto3

dynamodb_client = boto3.client("dynamodb", region_name='us-east-1')


def lambda_handler(event, context):
    # TODO implement
    response = dynamodb_client.get_item(TableName=os.getenv("DYNAMODB_TABLE"), Key={'CounterName': {'S': 'visitors'}})

    logging.debug(response)

    current_visit_count = int(list(response.get('Item').get('visits').values())[0]) + 1

    logging.debug(list(response.get('Item').get('visits').values())[0])
    logging.debug(current_visit_count)

    dynamodb_client.update_item(
        TableName=os.getenv("DYNAMODB_TABLE"),
        Key={'CounterName': {'S': 'visitors'}},
        UpdateExpression="SET visits = :newVisitor",
        ExpressionAttributeValues={":newVisitor": {'S': str(current_visit_count)}}
    )

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST',
        "Access-Control-Allow-Headers": "Content-Type"
    }

    data = {"visits": current_visit_count}

    result = {
        'statusCode': 200,
        # 'headers':headers,
        "body": json.dumps(data),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST",
        },
    }

    return result;
