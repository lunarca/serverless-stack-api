import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, _context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: "123",
      noteId: event.pathParameters.id,
    },
  };

  const {Item} = await dynamoDb.get(params);

  if (!Item) {
    throw new Error("Item not found.");
  }

  return Item;
});