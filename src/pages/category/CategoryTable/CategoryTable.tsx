import { getCategories } from '@/api/category';
import { QUERY_KEY } from '@/api/queryKeys';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import CategoryTableRow from './CategoryTableRow';

export default function CategoryTable() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });

  console.log({ data });

  return <div></div>;
}
