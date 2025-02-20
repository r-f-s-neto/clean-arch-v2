import React, { useState } from "react";
import Styles from "./signup-styles.scss";
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from "@/presentation/components";
import FormContext from "@/presentation/contexts/form/form-context";
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "@/presentation/protocols/validation";
import { IAddAccount } from "@/domain/usecases/add-account";

type Props = {
  validation: Validation;
  addAccount: IAddAccount;
};

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    emailError: "Campo Obrigatório",
    passwordError: "Campo Obrigatório",
    nameError: "Campo Obrigatório",
    passwordConfirmationError: "Campo Obrigatório",
    mainError: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const isSubmitDisabled =
    !!state.emailError ||
    !!state.passwordError ||
    !!state.nameError ||
    !!state.passwordConfirmationError ||
    !!state.mainError;

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState, validation }}>
        <form
          className={Styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            if (state.isLoading || isSubmitDisabled) {
              return;
            }
            setState((prevState) => ({ ...prevState, isLoading: true }));
            try {
              const response = await addAccount.add({
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirmation: state.passwordConfirmation,
              });
              setState((prevState) => ({
                ...prevState,
                isLoading: false,
                mainError: "",
              }));
              navigate("/login");
            } catch (error) {
              setState((prevState) => ({
                ...prevState,
                isLoading: false,
                mainError: error.message,
              }));
              console.log(error);
            }
          }}
          data-testid="form"
        >
          <h2>Registrar</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            className={Styles.submit}
            data-testid="submit"
            disabled={isSubmitDisabled}
            type="submit"
          >
            Cadastrar
          </button>
          <a
            data-testid="login"
            className={Styles.link}
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Voltar para login
          </a>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
