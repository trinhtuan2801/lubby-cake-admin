import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import firebaseUtils from './utils';
import { COLLECTION } from '@/constants';

const { firestore } = firebaseUtils;

export const getDocumentById = (collectionName: COLLECTION, id: string) => {
  return getDoc(doc(firestore, collectionName, id));
};

export const getDocuments = (collectionName: COLLECTION) => {
  return getDocs(collection(firestore, collectionName));
};

export const addDocument = (collectionName: COLLECTION, data: Object) => {
  return addDoc(collection(firestore, collectionName), data);
};

export const updateDocument = (
  collectionName: COLLECTION,
  id: string,
  data: Object,
) => {
  return setDoc(doc(firestore, collectionName, id), data, { merge: true });
};

export const deleteDocument = (collectionName: COLLECTION, id: string) => {
  return deleteDoc(doc(firestore, collectionName, id));
};
