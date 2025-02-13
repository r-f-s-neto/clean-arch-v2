export interface IFieldValidation {
  field: string;
  validate(value: string, valueToCompare?: string): Error;
}
