import React from "react";

import Styles from "./form-status-styles.scss";
import Spinner from "@/presentation/components/spinner/spinner";

type Props = {
  errorMessage?: string;
};
const FormStatus: React.FC<Props> = ({ errorMessage = "ERRO" }) => {
  return (
    <div className={Styles.errorWrap}>
      <span className={Styles.error}>{errorMessage}</span>
      <Spinner className={Styles.spinner} />
    </div>
  );
};

export default FormStatus;
