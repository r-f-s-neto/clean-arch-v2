import React, { useState } from "react";
import Styles from "./login-styles.scss";
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from "@/presentation/components";
import FormContext from "@/presentation/contexts/form/form-context";
import { Validation } from "@/presentation/protocols/validation";
import { IAuthentication } from "@/domain/usecases";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  validation: Validation;
  authentication: IAuthentication;
};

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    emailError: "Campo Obrigatório",
    passwordError: "Campo Obrigatório",
    mainError: "",
    email: "",
    password: "",
  });
  const isSubmitDisabled =
    !!state.emailError || !!state.passwordError || !!state.mainError;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (state.isLoading) {
      return;
    }
    setState((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      localStorage.setItem("accessToken", account.accessToken);
      navigate("/");
    } catch (error) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          mainError: error.message,
        };
      });
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState, validation }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            className={Styles.submit}
            data-testid="submit"
            disabled={isSubmitDisabled}
            type="submit"
          >
            Entrar
          </button>
          <Link data-testid="signup" to={"/signup"} className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
