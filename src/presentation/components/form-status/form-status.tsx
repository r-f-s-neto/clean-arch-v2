import React, { useContext } from "react";

import Styles from "./form-status-styles.scss";
import Spinner from "@/presentation/components/spinner/spinner";
import FormContext from "@/presentation/contexts/form/form-context";

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {!!mainError && (
        <span data-testid="error-message" className={Styles.error}>
          {mainError}
        </span>
      )}
      {isLoading && (
        <Spinner data-testid="loading" className={Styles.spinner} />
      )}
    </div>
  );
};

export default FormStatus;
