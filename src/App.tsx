import { useEffect, useState } from 'react';
import firebaseUtils from './firebase/utils';
import { userActions } from './redux/user/userSlice';
import AppRouter from './router/AppRouter';
import { useDispatch } from 'react-redux';
import { getUserData } from './api/user';

const { auth } = firebaseUtils;
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

  return <>{isCheckedAuth ? <AppRouter /> : <>Loading...</>}</>;
}

export default App;
