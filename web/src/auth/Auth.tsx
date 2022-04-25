import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Login } from "./login/Login";
import { Register } from "./register/Register";

export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const Auth = () => {
  const auth = useAuth();

  if (auth.token) {
    return <Navigate to='/' replace />
  }

  return <Routes>
    <Route path={AUTH_ROUTES.LOGIN} element={<Login />} />
    <Route path={AUTH_ROUTES.REGISTER} element={<Register />} />
    <Route path="*" element={<Navigate to={AUTH_ROUTES.LOGIN} />} />
  </Routes>;

}
