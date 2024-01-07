import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import APP_ENV from '../app-env';

export default function AuthGuard() {
  const { userData } = useAppSelector((s) => s.user);

  if (APP_ENV.env === 'DEV') return <Outlet />;
  if (!userData || !userData.roles.admin) return <Navigate to='/login' />;
  return <Outlet />;
}
