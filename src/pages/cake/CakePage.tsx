import { GlobalStyles, Typography } from '@mui/joy';
import CakeTable from './CakeTable/CakeTable';
import { CssVar } from '@/constants';

export default function CakePage() {
  return (
    <>
      <GlobalStyles
        styles={{
          ':root': {
            [CssVar.PAGE_WIDTH]: '600px',
          },
        }}
      />
      <Typography level='title-md'>Danh sách bánh</Typography>
      <CakeTable />
    </>
  );
}
