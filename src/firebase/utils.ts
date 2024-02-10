import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import firebaseServices from './services';
import dayjs from 'dayjs';

const { storage } = firebaseServices;
export const uploadImage = async (file: File) => {
  const storageRef = ref(
    storage,
    `cakes/${dayjs().format('DD-MM-YYYYTHH:mm:ss')}-${file.name}`,
  );
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
