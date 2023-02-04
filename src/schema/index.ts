import { mergeSchemas } from "@graphql-tools/schema";
import { adminSchema } from "./adminSchema";
import { userSchema } from "./userSchema";

export const schemas = mergeSchemas({
  schemas: [userSchema, adminSchema],
});
