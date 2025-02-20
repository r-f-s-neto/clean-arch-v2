import { SignUp } from "@/presentation/pages";
import React from "react";
import { makeRemoteAddAccount } from "../../usecases/add-account/remote-add-account-factory";
import { makeSignUpValidation } from "./signup-validation-factory";

const makeSignUp: React.FC = () => {
  const addAccount = makeRemoteAddAccount();
  const validation = makeSignUpValidation();
  return <SignUp addAccount={addAccount} validation={validation} />;
};

export default makeSignUp;
