import { RequiredFieldValidation } from "@/validation/required-field/required-field-validation";
import { RequiredFieldError } from "@/validation/errors";
import faker from "faker";

const makeSut = (field: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(field);
};

describe("RequiredFieldValidation", () => {
  test("Should return error if field is empty", () => {
    const sut = makeSut("email");
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });
  test("Should return falsy if field is not empty", () => {
    const sut = makeSut("email");
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
