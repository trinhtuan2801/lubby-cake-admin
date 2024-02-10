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
      <Typography level='title-md'>Loại bánh</Typography>
      <CategoryTable />
    </>
  );
}
