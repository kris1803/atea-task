import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthPage } from "../features/auth/view/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashPage } from "../features/dash/view/DashPage";

export const Router = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dash" element={<DashPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
