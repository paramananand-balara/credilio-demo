import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default {
  schema: schema.create({
    name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(30),
    ]),
    mobile: schema.number([rules.unsigned()]),
    gender: schema.enum(["MALE", "FEMALE"] as const),
    dateOfBirth: schema.date(),
  }),

  messages: {
    "name.minLength": "Name must be at least 3 characters",
    "name.maxLength": "Name must be at most 30 characters",
    "mobile.number": "Mobile must be a number",
    "mobile.unsigned": "Mobile must be a positive number",
    "gender.enum": "Gender can be either MALE or FEMALE",
  },

  dataSanitization: {
    mobile: (value) => (typeof value === "string" ? +value : value),
  },
};
