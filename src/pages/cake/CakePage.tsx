import { GlobalStyles, Typography } from '@mui/joy';
import CakeTable from './CakeTable/CakeTable';
import { CssVar } from '@/constants';

export default function CakePage() {
  return (
    <>
      <GlobalStyles
        styles={{
          ':root': {
            [CssVar.PAGE_WIDTH]: '800px',
          },
        }}
      />
      <Typography level='h2' component='h1'>
        Danh sách bánh
      </Typography>
      <CakeTable />
    </>
  );
}
