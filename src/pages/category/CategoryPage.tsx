import { GlobalStyles, Typography } from '@mui/joy';
import CategoryTable from './CategoryTable/CategoryTable';
import { CssVar } from '@/constants';

export default function CategoryPage() {
  return (
    <>
      <GlobalStyles
        styles={{
          ':root': {
            [CssVar.PAGE_WIDTH]: '600px',
          },
        }}
      />
      <Typography level='h2' component='h1'>
        Loại bánh
      </Typography>
      <CategoryTable />
    </>
  );
}
