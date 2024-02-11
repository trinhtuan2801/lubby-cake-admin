import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import firebaseServices from './services';
import dayjs from 'dayjs';
import { resizeImage } from '@/utils/file-utils';
const { storage } = firebaseServices;

export const uploadImage = async (
  file: File,
  dimensions?: { width: number; height: number },
) => {
  const resizedImage = await resizeImage(file, dimensions);

  const storageRef = ref(
    storage,
    `cakes/${dayjs().format('DD-MM-YYYYTHH:mm:ss')}-${file.name}`,
  );
  const snapshot = await uploadBytes(storageRef, resizedImage);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
