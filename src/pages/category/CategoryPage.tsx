import { Typography } from '@mui/joy';
import CategoryTable from './CategoryTable/CategoryTable';
import MyModal from '@/components/MyModal/MyModal';

export default function CategoryPage() {
  return (
    <>
      <Typography level='h2' component='h1'>
        Loại bánh
      </Typography>
      <CategoryTable />
    </>
  );
}
