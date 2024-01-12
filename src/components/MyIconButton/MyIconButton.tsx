import { IconButton, IconButtonProps, styled } from '@mui/joy';

const StyledIconButton = styled(IconButton)({
  borderRadius: '12px',
});

export default function MyIconButton(props: IconButtonProps) {
  return <StyledIconButton variant='outlined' {...props} />;
}
