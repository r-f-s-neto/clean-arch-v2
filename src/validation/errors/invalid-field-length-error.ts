export class InvalidFieldLengthError extends Error {
  constructor(private fieldName: string, private length: number) {
    super(`O campo ${fieldName} deve ter no mínimo ${length} caracteres`);
    this.name = "InvalidFieldLengthError";
  }
}
