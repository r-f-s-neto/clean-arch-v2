import { InvalidFieldLengthError } from "@/validation/errors/invalid-field-length-error";
import { MinLengthValidation } from "./min-length-validation";
import faker from "faker";
type SutTypes = {
  sut: MinLengthValidation;
};

const makeSut = (minLength: number): SutTypes => {
  const sut = new MinLengthValidation("password", minLength);
  return { sut };
};

describe("MinLengthValidation", () => {
  test("Should returns error if length is invalid", () => {
    const minLenght = 10;
    const { sut } = makeSut(minLenght);
    const error = sut.validate(faker.random.alphaNumeric(3));
    expect(error).toEqual(new InvalidFieldLengthError("password", minLenght));
  });

  test("Should return falsy if length is valid", () => {
    const minLenght = 10;
    const { sut } = makeSut(minLenght);
    const error = sut.validate(faker.random.alphaNumeric(10));
    expect(error).toBeFalsy();
  });
});
