import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("@/presentation/pages/login"));

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>carregando...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
