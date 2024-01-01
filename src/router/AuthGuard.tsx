import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

export default function AuthGuard() {
  const { userData } = useAppSelector((s) => s.user);
  if (!userData || !userData.roles.admin) return <Navigate to='/login' />;
  return <Outlet />;
}
