import React, { useContext } from "react";

import Styles from "./form-status-styles.scss";
import Spinner from "@/presentation/components/spinner/spinner";
import FormContext from "@/presentation/contexts/form/form-context";

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext);
  const { isLoading } = state;
  const { main: errorMessage } = errorState;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {!!errorMessage && <span className={Styles.error}>{errorMessage}</span>}
      {isLoading && <Spinner className={Styles.spinner} />}
    </div>
  );
};

export default FormStatus;
