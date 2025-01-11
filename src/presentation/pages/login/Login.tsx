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

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    emailError: "Campo Obrigatório",
    passwordError: "Campo Obrigatório",
    mainError: "",
    email: "",
    password: "",
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState, validation }}>
        <form className={Styles.form}>
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
            disabled
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
