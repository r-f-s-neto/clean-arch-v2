import { IFieldValidation } from "@/validation/protocols/field-validation";
import { RequiredFieldValidation } from "../required-field/required-field-validation";
import { ValidationBuilder } from "./validation-builder";
import { EmailValidation } from "../email/email-validation";
import { MinLengthValidation } from "../min-length/min-length-validation";

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const validations = ValidationBuilder.field("any_field").required().build();
    expect(validations).toEqual([new RequiredFieldValidation("any_field")]);
  });
  test("Should return EmailValidation", () => {
    const validations = ValidationBuilder.field("any_field").email().build();
    expect(validations).toEqual([new EmailValidation("any_field")]);
  });
  test("Should return MinLengthValidation", () => {
    const validations = ValidationBuilder.field("any_field")
      .minLength(10)
      .build();
    expect(validations).toEqual([new MinLengthValidation("any_field", 10)]);
  });
  test("Should return a list of validations", () => {
    const validations = ValidationBuilder.field("any_field")
      .required()
      .email()
      .minLength(10)
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation("any_field"),
      new EmailValidation("any_field"),
      new MinLengthValidation("any_field", 10),
    ]);
  });
});
