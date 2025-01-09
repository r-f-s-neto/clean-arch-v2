import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Login from "./Login";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = () => {
  const sut = render(<Login />);
  return { sut };
};

describe("Login Component", () => {
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
});
