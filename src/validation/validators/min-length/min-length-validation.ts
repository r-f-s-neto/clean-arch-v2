import { InvalidFieldLengthError } from "@/validation/errors/invalid-field-length-error";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements IFieldValidation {
  constructor(readonly field: string, private readonly length: number) {}
  validate(value: string): Error {
    const isValid = value.length >= this.length;
    if (!isValid) {
      return new InvalidFieldLengthError(this.field, this.length);
    }
    return null;
  }
}
