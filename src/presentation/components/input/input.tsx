import React, { useContext } from "react";
import FormContext from "@/presentation/contexts/form/form-context";

import Styles from "./input-styles.scss";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props) => {
  const { state, setState, validation } = useContext(FormContext);
  const error = state[`${props.name}Error`];

  console.log(error);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newInputValue = event.target.value;
    const errorMessage = validation.validate(props.name, newInputValue);
    setState((prevState) => {
      return {
        ...prevState,
        [props.name]: newInputValue,
        mainError: errorMessage,
        [`${props.name}Error`]: errorMessage,
      };
    });
  };
  const enableInput = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ): void => {
    event.target.readOnly = false;
  };
  const getStatus = (): string => {
    return error ? "🔴" : "🟢";
  };
  const getTitle = (): string => {
    return error ? error : "Tudo Certo";
  };

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
        data-testid={props.name}
      />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
