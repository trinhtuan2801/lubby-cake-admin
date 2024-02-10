// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import APP_ENV from '@/app-env';
import { getStorage } from 'firebase/storage';

const firebaseConfig = APP_ENV.firebase;

export const app = initializeApp(firebaseConfig);

const firebaseServices = {
  analytics: getAnalytics(app),
  auth: getAuth(app),
  provider: new GoogleAuthProvider(),
  firestore: getFirestore(app),
  storage: getStorage(app),
};

const { auth, provider } = firebaseServices;

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebaseServices;
