import { GraphQLError, GraphQLErrorExtensions } from "graphql";

export class InputValidationError extends GraphQLError {
  extensions: GraphQLErrorExtensions;
  constructor(message: string, field: string, statusCode: number) {
    super(message);
    this.extensions = {
      statusCode,
      code: "INPUT_VALIDATION_FAILED",
      field,
    };
  }
}
