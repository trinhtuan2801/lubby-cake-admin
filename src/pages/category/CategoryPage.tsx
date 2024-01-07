import { Input, Paper, TextField } from '@mui/material';
import CategoryTable from './CategoryTable/CategoryTable';

export default function CategoryPage() {
  return (
    <>
      <CategoryTable />
      <Paper sx={{ p: 1 }}>
        <Input placeholder='Loại bánh mới' fullWidth size='small' />
      </Paper>
    </>
  );
}
