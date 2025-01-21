import React from "react";
import Login from "@/presentation/pages/login/Login";
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";

const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validation = makeLoginValidation();
  return (
    <Login authentication={remoteAuthentication} validation={validation} />
  );
};

export default makeLogin;
