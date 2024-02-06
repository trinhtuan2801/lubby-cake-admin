import { COLLECTION } from '@/constants';
import {
  addDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from '@/firebase/crud';
export interface CategoryWithoutId {
  name: string
}

export interface Category extends CategoryWithoutId {
  id: string;
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

export const addCategory = async (newCate: CategoryWithoutId) => {
  return addDocument(COLLECTION.Categories, newCate);
};

export const updateCategory = async (id: string, updatedData: Partial<CategoryWithoutId>) => {
  return updateDocument(COLLECTION.Categories, id, updatedData);
};

export default {
  getCategories,
  deleteCategory,
  addCategory,
  updateCategory,
};
