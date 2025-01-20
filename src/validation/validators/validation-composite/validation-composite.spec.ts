import { IFieldValidation } from "@/validation/protocols/field-validation";
import { ValidationComposite } from "./validation-composite";
import { FieldValidationSpy } from "../tests/mock-validation";
import faker from "faker";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpies: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = new ValidationComposite(fieldValidationSpies);
  return { sut, fieldValidationSpies };
};

describe("ValidationComposite", () => {
  test("Should return error if any validator fails", () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationSpies } = makeSut(fieldName);
    const [fieldValidationSpy, fieldValidationSpy2] = fieldValidationSpies;
    fieldValidationSpy.error = new Error("first_error_message");
    fieldValidationSpy2.error = new Error("second_error_message");
    const error = sut.validate(fieldName, "any_value");
    expect(error).toBe("first_error_message");
  });
  test("Should not return error if all validators are ok", () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, "any_value");
    expect(error).toBeFalsy();
  });
});
