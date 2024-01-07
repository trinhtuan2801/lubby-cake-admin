// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import APP_ENV from '../app-env';

const firebaseConfig = APP_ENV.firebase;

export const app = initializeApp(firebaseConfig);

const firebaseUtils = {
  analytics: getAnalytics(app),
  auth: getAuth(app),
  provider: new GoogleAuthProvider(),
  firestore: getFirestore(app),
};

const { auth, provider } = firebaseUtils;

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebaseUtils;
