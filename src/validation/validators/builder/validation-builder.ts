import { IFieldValidation } from "@/validation/protocols/field-validation";
import { RequiredFieldValidation } from "../required-field/required-field-validation";
import { EmailValidation } from "../email/email-validation";
import { MinLengthValidation } from "../min-length/min-length-validation";
import { CompareFields } from "../compare/compare-fields";

export class ValidationBuilder {
  private constructor(
    private readonly fieldname: string,
    private readonly validations: IFieldValidation[]
  ) {}
  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldname));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldname));
    return this;
  }

  minLength(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldname, length));
    return this;
  }

  compare(): ValidationBuilder {
    const compareFields = new CompareFields(this.fieldname);
    this.validations.push(compareFields);
    return this;
  }

  build(): IFieldValidation[] {
    return this.validations;
  }
}
