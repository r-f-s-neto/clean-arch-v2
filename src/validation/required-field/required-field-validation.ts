import { RequiredFieldError } from "@/validation/errors";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class RequiredFieldValidation implements IFieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): RequiredFieldError {
    const isEmpty = value === "";
    if (isEmpty) {
      return new RequiredFieldError();
    }

    return null;
  }
}
