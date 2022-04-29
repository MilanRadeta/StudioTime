import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../Main';
import { useAuth } from '../../auth/contexts/AuthContext';
import { Home } from '../modules/home/components/Home';
import { StudioList } from '../modules/studios/components/StudioList';
import { StudioProfile } from '../modules/studios/components/StudioProfile';
import { StudioProvider } from '../modules/studios/contexts/StudioContext';

export const APP_ROUTES = {
  HOME: 'home',
  STUDIO: 'studio'
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
      <Link to={`/${APP_ROUTES.STUDIO}`}>STUDIOS</Link>
    </nav>
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<Home />} />
      <Route path={APP_ROUTES.STUDIO} element={<StudioList />} />
      <Route path={`${APP_ROUTES.STUDIO}/:id`} element={<StudioProfile />} />
      <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
    </Routes>
    <Outlet></Outlet>
  </StudioProvider>;
}
