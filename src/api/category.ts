import { COLLECTION } from '@/constants';
import { addDocument, deleteDocument, getDocuments } from '@/firebase/crud';

export interface Category {
  id: string;
  name: string;
}

export const getCategories = async () => {
  try {
    const doc = await getDocuments(COLLECTION.Categories);
    const arr = doc.docs;
    return arr.map((v) => ({
      ...v.data(),
      id: v.id,
    })) as Category[];
  } catch (err) {
    return [];
  }
};

export const deleteCategory = (id: string) => {
  return deleteDocument(COLLECTION.Categories, id);
};

export const addCategory = async (newCate: string) => {
  return addDocument(COLLECTION.Categories, {
    name: newCate,
  });
};
