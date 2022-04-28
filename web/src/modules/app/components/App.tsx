import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../Main';
import { useAuth } from '../../auth/contexts/AuthContext';
import { Home } from '../modules/home/components/Home';
import { Studios } from '../modules/studios/components/Studios';
import { StudioProvider } from '../modules/studios/contexts/StudioContext';

export const APP_ROUTES = {
  HOME: 'home',
  STUDIOS: 'studios'
}

export const App = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to={MAIN_ROUTES.AUTH} state={{ from: location }} replace />
  }

  return <StudioProvider>
    <nav>
      <Link to={`/${APP_ROUTES.HOME}`}>HOME</Link>
      <Link to={`/${APP_ROUTES.STUDIOS}`}>STUDIOS</Link>
    </nav>
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<Home />} />
      <Route path={APP_ROUTES.STUDIOS} element={<Studios />} />
      <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
    </Routes>
    <Outlet></Outlet>
  </StudioProvider>;
}
