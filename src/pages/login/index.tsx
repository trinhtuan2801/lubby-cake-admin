import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserData } from '../../api/user';
import firebaseUtils from '../../firebase';
import { userActions } from '../../redux/user/slice';

const { auth, provider } = firebaseUtils;

export default function Login() {
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
      <Button variant='contained' onClick={signInWithGoogle}>
        Login
      </Button>
    </>
  );
}
