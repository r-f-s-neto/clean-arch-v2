import { InvalidFieldError } from "@/validation/errors";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class CompareFields implements IFieldValidation {
  constructor(readonly field: string) {}
  validate(value: string, valueToCompare: string): Error {
    const isEqual = value === valueToCompare;
    if (!isEqual) {
      return new InvalidFieldError();
    }

    return null;
  }
}
