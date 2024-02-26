import { useEffect, useState } from 'react';
import firebaseServices from './firebase/services';
import { userActions } from './redux/user/userSlice';
import AppRouter from './router/AppRouter';
import { useDispatch } from 'react-redux';
import { getUserData } from './api/user';
import { Box, CircularProgress } from '@mui/joy';

const { auth } = firebaseServices;
function App() {
  const [isCheckedAuth, setIsCheckedAuth] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getUserData(user);
        dispatch(userActions.setUserData(userData));
      }
      setIsCheckedAuth(true);
    });
  }, []);

  return isCheckedAuth ? (
    <AppRouter />
  ) : (
    <Box
      height='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <CircularProgress />
    </Box>
  );
}

export default App;
