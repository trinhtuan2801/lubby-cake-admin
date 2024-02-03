import { Typography } from '@mui/joy';
import CategoryTable from './CategoryTable/CategoryTable';

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
