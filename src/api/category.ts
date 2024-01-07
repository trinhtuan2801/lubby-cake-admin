import { COLLECTION } from '../constants';
import { getDocuments } from '../firebase/crud';

export interface Category {
  id: string;
  name: string;
}

export const getCategories = async () => {
  const doc = await getDocuments(COLLECTION.Categories);
  const arr = doc.docs;
  return arr.map((v) => ({
    ...v.data(),
    id: v.id,
  })) as Category[];
};
