import { Route, Routes } from 'react-router-dom';
import { App } from './app/App';
import { Auth } from './auth/Auth';

export const MAIN_ROUTES = {
  AUTH: '/auth'
}

export const Main = () => {
  return <Routes>
    <Route path={`${MAIN_ROUTES.AUTH}/*`} element={<Auth />} />
    <Route path="*" element={<App />} />
  </Routes>;
}