import { Validation } from "@/presentation/protocols/validation";
import {
  ValidationBuilder,
  ValidationComposite,
} from "@/validation/validators";

export const makeSignUpValidation = (): Validation => {
  return new ValidationComposite([
    ...ValidationBuilder.field("name").required().build(),
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().minLength(10).build(),
    ...ValidationBuilder.field("passwordConfirmation")
      .required()
      .minLength(10)
      .compare()
      .build(),
  ]);
};
