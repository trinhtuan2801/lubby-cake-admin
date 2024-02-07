import { COLLECTION } from '@/constants';
import {
  addDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from '@/firebase/crud';

export interface CakePrice {
  size: string;
  price: number;
  oldPrice?: number;
}

export interface CakeWithoutId {
  name: string;
  desc: string;
  prices: CakePrice[];
}

export interface Cake extends CakeWithoutId {
  id: string;
}

export const getCakes = async () => {
  try {
    const doc = await getDocuments(COLLECTION.Cakes);
    const arr = doc.docs;
    return arr.map((v) => ({
      ...v.data(),
      id: v.id,
    })) as Cake[];
  } catch (err) {
    return [];
  }
};

export const deleteCake = (id: string) => {
  return deleteDocument(COLLECTION.Cakes, id);
};

export const addCake = async (newCate: CakeWithoutId) => {
  return addDocument(COLLECTION.Cakes, newCate);
};

export const updateCake = async (
  id: string,
  updatedData: Partial<CakeWithoutId>,
) => {
  return updateDocument(COLLECTION.Cakes, id, updatedData);
};

export default {
  getCakes,
  deleteCake,
  addCake,
  updateCake,
};
