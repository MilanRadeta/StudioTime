import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { MAIN_ROUTES } from '../Main';
import { Home } from './home/Home';

export const APP_ROUTES = {
  HOME: 'home'
}

export const App = () => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token) {
    return <Navigate to={MAIN_ROUTES.AUTH} state={{ from: location }} replace />
  }
  
  return <Routes>
    <Route path={`${APP_ROUTES.HOME}`} element={<Home />} />
    <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
  </Routes>;
}
