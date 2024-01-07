import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout/AppLayout';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import NotFoundPage from '../pages/not-found/NotFoundPage';
import AuthGuard from './AuthGuard';
import CategoryPage from '../pages/category/CategoryPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={AppLayout}>
          <Route Component={AuthGuard}>
            <Route path='' Component={HomePage} />
            <Route path='categories' Component={CategoryPage} />
          </Route>
          <Route path='login' Component={LoginPage} />
          <Route path='*' Component={NotFoundPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
