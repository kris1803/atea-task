import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthPage } from "../features/auth/view/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashPage } from "../features/dash/view/DashPage";
import { AuthProvider } from "../features/auth/data/AuthContext";

export const Router = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dash" element={<DashPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
