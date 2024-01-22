import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AuthRegisterValidator {
  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.maxLength(16),
      rules.regex(/[a-zA-Z0-9]/),
    ]),
  });

  public messages = {
    "email.email": "Enter a valid email address",
    "email.unique": "Email already exists",
    "password.minLength": "Password must be at least 8 characters",
    "password.maxLength": "Password must be at most 16 characters",
    "password.regex": "Password must contain alphabets and numbers only",
  };
}
