import { SignUp } from "@/presentation/pages";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

type RouterProps = {
  makeLogin: () => Promise<{ default: React.ComponentType<any> }>;
  makeSignUp: () => Promise<{ default: React.ComponentType<any> }>;
};
const Router: React.FC<RouterProps> = ({
  makeLogin,
  makeSignUp,
}: RouterProps) => {
  const lazyMakeLogin = lazy(makeLogin);
  const lazyMakeSignUp = lazy(makeSignUp);
  return (
    <BrowserRouter>
      <Suspense fallback={<div>carregando...</div>}>
        <Routes>
          <Route path="/login" element={React.createElement(lazyMakeLogin)} />
          <Route path="/signup" element={React.createElement(lazyMakeSignUp)} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
