import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

const makeSut = () => {
  return render(<Login />);
};

describe("Login Component", () => {
  test("Should component starts with initial states", () => {
    const { getByTestId } = makeSut();
    const errorWrap = getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
});
