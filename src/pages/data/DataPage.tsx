import { Box, Typography } from '@mui/joy';
import DeployButton from './DeployButton';
import DeleteUnusedImagesButton from './DeleteUnusedImagesButton';

export default function DataPage() {
  return (
    <>
      <Typography level='title-md' color='primary' fontWeight='bold'>
        Dữ liệu
      </Typography>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        gap={1}
      >
        <DeleteUnusedImagesButton />
        <DeployButton />
      </Box>
    </>
  );
}
