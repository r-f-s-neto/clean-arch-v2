import { InvalidFieldError } from "@/validation/errors";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements IFieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): Error {
    const isEmailValid = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!isEmailValid) {
      return new InvalidFieldError();
    }
  }
}
