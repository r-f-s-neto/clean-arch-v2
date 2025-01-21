import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

type RouterProps = {
  makeLogin: () => Promise<{ default: React.ComponentType<any> }>;
};
const Router: React.FC<RouterProps> = ({ makeLogin }: RouterProps) => {
  const lazyMakeLogin = lazy(makeLogin);
  return (
    <BrowserRouter>
      <Suspense fallback={<div>carregando...</div>}>
        <Routes>
          <Route path="/login" element={React.createElement(lazyMakeLogin)} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
