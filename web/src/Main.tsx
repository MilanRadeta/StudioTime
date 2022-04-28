import { Route, Routes } from 'react-router-dom';
import { App } from './modules/app/components/App';
import { Auth } from './modules/auth/components/Auth';

export const MAIN_ROUTES = {
  AUTH: '/auth'
}

export const Main = () => {
  return <Routes>
    <Route path={`${MAIN_ROUTES.AUTH}/*`} element={<Auth />} />
    <Route path="*" element={<App />} />
  </Routes>;
}