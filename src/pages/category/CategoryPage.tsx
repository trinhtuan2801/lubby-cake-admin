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
      <MyModal open title="hehe" >
        <div
          style={{
            height: '100px',
            background:
              'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 23%, rgba(0,212,255,1) 100%)',
          }}
        />
      </MyModal>
    </>
  );
}
