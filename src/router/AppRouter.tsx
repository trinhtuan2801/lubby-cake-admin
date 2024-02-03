import AppLayout from '@/layout/AppLayout';
import CategoryPage from '@/pages/category/CategoryPage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/not-found/NotFoundPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={AppLayout}>
          <Route Component={AuthGuard}>
            <Route path='' element={<Navigate to='categories' replace/>} />
            <Route path='categories' Component={CategoryPage} />
          </Route>
        </Route>
        <Route path='/login' Component={LoginPage} />
        <Route path='*' Component={NotFoundPage} />
      </Routes>
    </BrowserRouter>
  );
}
