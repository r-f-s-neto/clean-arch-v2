import "jest-localstorage-mock";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
  within,
} from "@testing-library/react";
import { Login } from "@/presentation/pages";
import { ValidationSpy } from "@/presentation/tests/mock-validation";
import faker from "faker";
import { AuthenticationSpy } from "@/presentation/tests/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors";
import { MemoryRouter, useNavigate } from "react-router-dom";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const navigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(navigate);

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const sut = render(
    <MemoryRouter
      initialEntries={["/login"]}
      initialIndex={0}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </MemoryRouter>
  );
  return { sut, validationSpy, authenticationSpy };
};

describe("Login Component", () => {
  // limpa para cada teste
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(cleanup);

  test("Should component starts with initial states", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const errorWrap = getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = getByTestId("email-status");
    expect(emailStatus.textContent).toBe("🔴");
    expect(emailStatus.title).toBe("Campo Obrigatório");
    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.textContent).toBe("🔴");
    expect(passwordStatus.title).toBe("Campo Obrigatório");
  });

  test("Should call validation with correct email", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId("email");
    const email = faker.internet.email();
    //simula passar um email com o valor any_email
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fieldValue).toBe(email);
  });

  test("Should call validation with correct password", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId("password");
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fieldValue).toBe(password);
  });

  test("Should show error if validation fails", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const errorMessage = faker.random.words();
    validationSpy.errorMessage = errorMessage;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    const errorWrap = getByTestId("error-wrap");
    fireEvent.input(emailInput, { target: { value: email } });
    const errorDiv = within(errorWrap).getByTestId("error-message");
    expect(errorDiv.textContent).toBe(errorMessage);
  });

  test("Should show email error if email validation fails", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const errorMessage = faker.random.words();
    validationSpy.errorMessage = errorMessage;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });
    const emailStatus = getByTestId("email-status");
    expect(emailStatus.title).toBe(errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
  });

  test("Should show password error if password validation fails", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const errorMessage = faker.random.words();
    validationSpy.errorMessage = errorMessage;
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: password } });
    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe(errorMessage);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show password success if password validation success", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const errorMessage = null;
    validationSpy.errorMessage = errorMessage;
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: password } });
    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo Certo");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  test("Should show email success if email validation success", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const errorMessage = null;
    validationSpy.errorMessage = errorMessage;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });
    const emailStatus = getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo Certo");
    expect(emailStatus.textContent).toBe("🟢");
  });

  test("Should enable submit button available if form is valid", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    validationSpy.errorMessage = null;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(emailInput, { target: { value: email } });
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = getByTestId("submit");
    expect(submitButton).toHaveProperty("disabled", false);
  });

  test("Should show loading when press submit button", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId, queryByTestId } = sut;
    validationSpy.errorMessage = null;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(emailInput, { target: { value: email } });
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);
    expect(queryByTestId("loading")).not.toBeNull();
  });

  test("Should call authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const { getByTestId } = sut;
    const email = faker.internet.email();
    const emailInput = getByTestId("email");
    const password = faker.internet.password();
    const passwordInput = getByTestId("password");
    fireEvent.input(emailInput, { target: { value: email } });
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test("should call authentication once", () => {
    const { sut, authenticationSpy, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    const { getByTestId } = sut;
    const email = faker.internet.email();
    const password = faker.internet.password();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(1);
  });

  test("Should not call authentication if form isInvalid", () => {
    const { sut, authenticationSpy, validationSpy } = makeSut();
    validationSpy.errorMessage = "any_error";
    const { getByTestId } = sut;
    const email = faker.internet.email();
    const password = faker.internet.password();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(0);
  });

  // test("Should presents error if authentication fails", async () => {
  //   const { sut, authenticationSpy, validationSpy } = makeSut();
  //   validationSpy.errorMessage = null;
  //   authenticationSpy.error = true;
  //   const { getByTestId, findByTestId } = sut;
  //   const email = faker.internet.email();
  //   const password = faker.internet.password();
  //   const emailInput = getByTestId("email");
  //   fireEvent.input(emailInput, { target: { value: email } });
  //   const passwordInput = getByTestId("password");
  //   fireEvent.input(passwordInput, { target: { value: password } });
  //   const submitButton = getByTestId("submit");
  //   fireEvent.click(submitButton);
  //   const error = await findByTestId("error-message");
  //   expect(error).not.toBeNull();
  // });

  test("Should presents error if authentication fails", async () => {
    const { sut, authenticationSpy, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(new InvalidCredentialsError()));
    const { getByTestId, findByTestId } = sut;
    const email = faker.internet.email();
    const password = faker.internet.password();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);
    const error = await findByTestId("error-message");
    expect(error).not.toBeNull();
  });

  test("Should add accessToken to localStorage", async () => {
    const { sut, authenticationSpy, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    const { getByTestId } = sut;
    const email = faker.internet.email();
    const password = faker.internet.password();
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "accessToken",
        authenticationSpy.account.accessToken
      );
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  test("Should got to sigup page", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const register = getByTestId("signup");
    fireEvent.click(register);
    waitFor(() => {
      expect(window.location.pathname).toBe("/signup");
    });
  });

  test("Should disable readonly in password and email input", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId("email");
    fireEvent.focus(emailInput);
    expect(emailInput).toHaveProperty("readOnly", false);
    const passwordInput = getByTestId("password");
    fireEvent.focus(passwordInput);
    expect(passwordInput).toHaveProperty("readOnly", false);
  });
});
