import { Validation } from "@/presentation/protocols/validation";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class ValidationComposite implements Validation {
  constructor(private readonly validators: IFieldValidation[]) {}
  validate(fieldName: string, fieldValue: string): string {
    const message = null;
    const filteredValidators = this.validators.filter(
      (validator) => validator.field === fieldName
    );
    for (const validator of filteredValidators) {
      const error = validator.validate(fieldValue);
      const hasError = !!error;
      if (hasError) {
        return error.message;
      }
    }
  }
}
