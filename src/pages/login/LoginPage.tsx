import { getUserData } from '@/api/user';
import firebaseUtils from '@/firebase/utils';
import { userActions } from '@/redux/user/userSlice';
import { Button } from '@mui/joy';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { auth, provider } = firebaseUtils;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const userData = await getUserData(user);
      if (!userData || !userData.roles.admin) throw new Error();
      dispatch(userActions.setUserData(userData));
      navigate('/');
    } catch (err) {
      console.log(err);
      auth.signOut();
      toast.error('Không phải tài khoản admin');
    }
  };

  return (
    <>
      <Button variant='solid' onClick={signInWithGoogle}>
        Login
      </Button>
    </>
  );
}
