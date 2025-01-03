import React, { memo } from "react";
import { ReactComponent as Logo } from "@/presentation/assets/images/logo.svg";

import Styles from "./login-header-styles.scss";

type Props = React.HTMLAttributes<HTMLElement>;

const LoginHeader: React.FC<Props> = (props: Props) => {
  return (
    <header {...props} className={[Styles.header, props.className].join(" ")}>
      <Logo width="120px" height="87px" />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
