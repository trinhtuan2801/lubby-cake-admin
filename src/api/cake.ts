import { COLLECTION } from '@/constants';
import {
  addDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from '@/firebase/crud';
import { Category } from './category';

export interface CakePrice {
  size: string;
  price: number;
  oldPrice?: number;
}

export interface CakeWithoutId {
  name: string;
  desc: string;
  prices: CakePrice[];
  images: string[];
  categoryIds: string[];
}

export interface Cake extends CakeWithoutId {
  id: string;
}

export interface CakeWithCategories extends Cake {
  categories: Category[];
}

export const getCakes = async (categories: Category[]) => {
  try {
    const doc = await getDocuments(COLLECTION.Cakes);
    const arr = doc.docs;
    return arr.map((v) => {
      const cakeWithoutId = v.data() as CakeWithoutId;
      const cake: Cake = {
        ...cakeWithoutId,
        id: v.id,
      };
      const cakeCategories = categories.filter((cate) =>
        cake.categoryIds.includes(cate.id),
      );
      const cakeWithCategories: CakeWithCategories = {
        ...cake,
        categories: cakeCategories,
      };
      return cakeWithCategories;
    });
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
