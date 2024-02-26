import AppLayout from '@/layout/AppLayout';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/not-found/NotFoundPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import CakePage from '@/pages/cake/CakePage';
import DataPage from '@/pages/data/DataPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={LoginPage} />
        <Route path='/' Component={AppLayout}>
          <Route Component={AuthGuard}>
            <Route path='' element={<Navigate to='cakes' replace />} />
            {/* <Route path='categories' Component={CategoryPage} /> */}
            <Route path='cakes' Component={CakePage} />
            <Route path='data' Component={DataPage} />
            <Route path='*' Component={NotFoundPage} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
