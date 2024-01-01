import { useEffect, useState } from 'react';
import firebaseUtils from './firebase';
import { userActions } from './redux/user/slice';
import AppRouter from './router';
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
