import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Home from '../pages/home';
import Login from '../pages/login';
import NotFound from '../pages/not-found';
import AuthGuard from './AuthGuard';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={AppLayout}>
          <Route Component={AuthGuard}>
            <Route path='' Component={Home} />
          </Route>
          <Route path='login' Component={Login} />
          <Route path='*' Component={NotFound} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
