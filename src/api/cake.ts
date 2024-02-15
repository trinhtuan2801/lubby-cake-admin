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
  categories: Category[];
}

export interface Cake extends CakeWithoutId {
  id: string;
}

export const getCakes = async (categories: Category[] = []) => {
  try {
    const doc = await getDocuments(COLLECTION.Cakes);
    const arr = doc.docs;
    return arr.map((v) => {
      const cakeWithoutId = v.data() as Omit<CakeWithoutId, 'categories'>;
      const cake: Cake = {
        ...cakeWithoutId,
        id: v.id,
        categories: [],
      };
      const cakeCategories = categories.filter((cate) =>
        cake.categoryIds.includes(cate.id),
      );
      cake.categories = cakeCategories;
      return cake;
    });
  } catch (err) {
    return undefined;
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
