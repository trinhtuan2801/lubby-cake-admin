import { GlobalStyles, Typography } from '@mui/joy';
import CakeTable from './CakeTable/CakeTable';
import { CssVar } from '@/constants';

export default function CakePage() {
  // const { ImportComponent, triggerImport } = useUploadImage();
  return (
    <>
      <GlobalStyles
        styles={{
          ':root': {
            [CssVar.PAGE_WIDTH]: '600px',
          },
        }}
      />
      {/* <ImportComponent /> */}
      {/* <Button onClick={triggerImport}>Import</Button> */}

      <Typography level='title-md' color='primary' fontWeight='bold'>
        Danh sách bánh
      </Typography>
      <CakeTable />
    </>
  );
}
