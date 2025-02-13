import "jest-localstorage-mock";
import React from "react";
import {
  cleanup,
  findByTestId,
  fireEvent,
  render,
  RenderResult,
  waitFor,
  within,
} from "@testing-library/react";
import { SignUp } from "@/presentation/pages";
import { ValidationSpy } from "@/presentation/tests/mock-validation";
import faker from "faker";
import { AuthenticationSpy } from "@/presentation/tests/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { LocalSaveAccessTokenSpy } from "@/presentation/tests/mock-local-save-access-token";
import { SetStorageMock } from "@/data/tests/mock-set-storage";

type SutType = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutType => {
  const validationSpy = new ValidationSpy();
  const sut = render(
    <MemoryRouter
      initialEntries={["/signup"]}
      initialIndex={0}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <SignUp validation={validationSpy} />
    </MemoryRouter>
  );

  return { sut, validationSpy };
};

describe("SignUp Component", () => {
  afterEach(cleanup);
  test("Should component starts with initial states", () => {
    const { sut } = makeSut();
    const { getByTestId, queryByTestId } = sut;
    const name = getByTestId("name");
    const email = getByTestId("email");
    const password = getByTestId("password");
    const passwordConfirmation = getByTestId("passwordConfirmation");
    const submitButton = getByTestId("submit");

    const nameStatus = getByTestId("name-status");
    const emailStatus = getByTestId("email-status");
    const passwordStatus = getByTestId("password-status");
    const passwordConfirmationStatus = getByTestId(
      "passwordConfirmation-status"
    );

    const errorWrap = getByTestId("error-wrap");
    const errorMessage = within(errorWrap).queryByTestId("error-message");
    const loading = within(errorWrap).queryByTestId("loading");

    expect(name.textContent).toBe("");
    expect(email.textContent).toBe("");
    expect(password.textContent).toBe("");
    expect(passwordConfirmation.textContent).toBe("");
    expect(submitButton).toHaveProperty("disabled", true);
    expect(nameStatus.textContent).toBe("🔴");
    expect(emailStatus.textContent).toBe("🔴");
    expect(passwordStatus.textContent).toBe("🔴");
    expect(passwordConfirmationStatus.textContent).toBe("🔴");
    expect(errorMessage).toBeNull();
    expect(loading).toBeNull();
  });

  test("Should call validation with correct email", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId("email");
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fieldValue).toBe(email);
  });

  test("Should call validation with correct password", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId("password");
    const password = faker.random.word();
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fieldValue).toBe(password);
  });

  test("Should call validation with correct name", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const nameInput = getByTestId("name");
    const name = faker.random.word();
    fireEvent.input(nameInput, { target: { value: name } });
    expect(validationSpy.fieldValue).toBe(name);
  });

  test("Should call validation with correct password confirmation", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const passwordConfirmationInput = getByTestId("passwordConfirmation");
    const passwordConfirmation = faker.random.word();
    fireEvent.input(passwordConfirmationInput, {
      target: { value: passwordConfirmation },
    });
    expect(validationSpy.fieldValue).toBe(passwordConfirmation);
  });

  test("Should show error if validation fails", async () => {
    const { sut, validationSpy } = makeSut();
    const { findByTestId, getByTestId } = sut;
    const error = faker.random.word();
    validationSpy.errorMessage = error;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });

    await waitFor(async () => {
      const errorMessage = await findByTestId("error-message");
      expect(errorMessage.textContent).toBe(error);
    });
  });

  test("Should show email error if email validation fails", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const error = faker.random.word();
    validationSpy.errorMessage = error;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });

    const emailStatus = getByTestId("email-status");
    expect(emailStatus.textContent).toBe("🔴");
    expect(emailStatus).toHaveProperty("title", error);
  });

  test("Should show name error if email validation fails", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const error = faker.random.word();
    validationSpy.errorMessage = error;
    const name = faker.internet.email();
    const nameInput = getByTestId("name");
    fireEvent.input(nameInput, { target: { value: name } });

    const nameStatus = getByTestId("name-status");
    expect(nameStatus.textContent).toBe("🔴");
    expect(nameStatus).toHaveProperty("title", error);
  });

  test("Should show password error if email validation fails", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const error = faker.random.word();
    validationSpy.errorMessage = error;
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: password },
    });

    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.textContent).toBe("🔴");
    expect(passwordStatus).toHaveProperty("title", error);
  });

  test("Should show password confirmation error if email validation fails", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const error = faker.random.word();
    validationSpy.errorMessage = error;
    const passwordConfirmation = faker.internet.password();
    const passwordConfirmationInput = getByTestId("passwordConfirmation");
    fireEvent.input(passwordConfirmationInput, {
      target: { value: passwordConfirmation },
    });

    const passwordConfirmationStatus = getByTestId(
      "passwordConfirmation-status"
    );
    expect(passwordConfirmationStatus.textContent).toBe("🔴");
    expect(passwordConfirmationStatus).toHaveProperty("title", error);
  });

  test("Should show email success if email validation fails", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });

    const emailStatus = getByTestId("email-status");
    expect(emailStatus.textContent).toBe("🟢");
    expect(emailStatus).toHaveProperty("title", "Tudo Certo");
  });

  test("Should show name success if email validation fails", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const name = faker.internet.email();
    const nameInput = getByTestId("name");
    fireEvent.input(nameInput, { target: { value: name } });

    const nameStatus = getByTestId("name-status");
    expect(nameStatus.textContent).toBe("🟢");
    expect(nameStatus).toHaveProperty("title", "Tudo Certo");
  });

  test("Should show password success if email validation fails", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: password },
    });

    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.textContent).toBe("🟢");
    expect(passwordStatus).toHaveProperty("title", "Tudo Certo");
  });

  test("Should show password confirmation success if password validation success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const passwordConfirmation = faker.internet.password();
    const passwordConfirmationInput = getByTestId("passwordConfirmation");
    fireEvent.input(passwordConfirmationInput, {
      target: { value: passwordConfirmation },
    });

    const passwordConfirmationStatus = getByTestId(
      "passwordConfirmation-status"
    );
    expect(passwordConfirmationStatus.textContent).toBe("🟢");
    expect(passwordConfirmationStatus).toHaveProperty("title", "Tudo Certo");
  });

  test("Should enable submit button available if form is valid", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const nameInput = getByTestId("name");
    const name = faker.random.word();
    fireEvent.input(nameInput, { target: { value: name } });
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: password },
    });
    const passwordConfirmation = faker.internet.password();
    const passwordConfirmationInput = getByTestId("passwordConfirmation");
    fireEvent.input(passwordConfirmationInput, {
      target: { value: passwordConfirmation },
    });
    const submitButton = getByTestId("submit");

    expect(submitButton).toHaveProperty("disabled", false);
  });

  test("Should show loading when press submit button", () => {
    const { sut } = makeSut();
    const { getByTestId, queryByTestId } = sut;
    const nameInput = getByTestId("name");
    const name = faker.random.word();
    fireEvent.input(nameInput, { target: { value: name } });
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: password },
    });
    const passwordConfirmation = faker.internet.password();
    const passwordConfirmationInput = getByTestId("passwordConfirmation");
    fireEvent.input(passwordConfirmationInput, {
      target: { value: passwordConfirmation },
    });
    const form = getByTestId("form");
    fireEvent.submit(form);
    const loading = queryByTestId("loading");
    expect(loading).toBeTruthy();
  });
});
