import * as uuid from "uuid";
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function main(event, _context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: '123',
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamodb.put(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: e.message}),
    }
  }
}
