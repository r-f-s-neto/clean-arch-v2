export class UnespectedError extends Error {
  constructor() {
    super("Error inesperado");
    this.name = "UnespectedError";
  }
}
