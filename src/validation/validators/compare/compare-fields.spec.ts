import { InvalidFieldError } from "@/validation/errors";
import { CompareFields } from "./compare-fields";
import faker from "faker";

type SutTypes = {
  sut: CompareFields;
};

const makeSut = (fieldName: string = faker.database.column()): SutTypes => {
  const sut = new CompareFields(fieldName);
  return { sut };
};

describe("CompareFields", () => {
  test("Should return error if fields are not equal", () => {
    const { sut } = makeSut();
    const value = "value1";
    const valueToCompare = "value2";
    const error = sut.validate(value, valueToCompare);
    expect(error).toEqual(new InvalidFieldError());
  });

  test("Should return falsy if field are the same", () => {
    const { sut } = makeSut();
    const value = faker.random.word();
    const error = sut.validate(value, value);
    expect(error).toBeFalsy();
  });
});
