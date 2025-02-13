export interface Validation {
  validate(
    fieldName: string,
    fieldValue: string,
    fieldValueToCompare?: string
  ): string;
}
