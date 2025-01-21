import {
  ValidationBuilder,
  ValidationComposite,
} from "@/validation/validators";
import { makeLoginValidation } from "./login-validation-factory";

describe("makeLoginValidation", () => {
  test("Should return correct ValidationComposite", () => {
    expect(makeLoginValidation()).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().minLength(10).build(),
      ])
    );
  });
});
