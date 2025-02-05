import React from "react";
import Login from "@/presentation/pages/login/Login";
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";
import { makeLocalSaveAcessToken } from "../../cache/local-save-acess-token-factory";

const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validation = makeLoginValidation();
  const localSaveAccessToken = makeLocalSaveAcessToken();
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validation}
      localSaveAccessToken={localSaveAccessToken}
    />
  );
};

export default makeLogin;
