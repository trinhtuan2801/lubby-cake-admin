import { CakePrice } from '@/api/cake';

interface Props {
  size: string;
  price: number;
  oldPrice: number;
  setData: (newPrice: CakePrice) => void;
}

// eslint-disable-next-line
export default function PriceInput({ oldPrice }: Props) {
  return null;
}
