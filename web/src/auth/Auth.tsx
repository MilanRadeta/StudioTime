import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Login } from "./login/Login";

export const AUTH_ROUTES = {
  LOGIN: "login"
};

export const Auth = () => {
  let auth = useAuth();

  if (auth.token) {
    return <Navigate to='' replace />
  }

  return <Routes>
    <Route path={AUTH_ROUTES.LOGIN} element={<Login />} />
    <Route path="*" element={<Navigate to={AUTH_ROUTES.LOGIN} />} />
  </Routes>;

}
