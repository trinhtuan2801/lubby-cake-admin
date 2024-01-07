import { ButtonProps, IconButton, styled } from '@mui/material';

const StyledIconButton = styled(IconButton)({
  borderRadius: '12px',
  border: '1px solid #DAE2ED',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px',
  ':hover': {
    borderColor: '#C7D0DD',
    backgroundColor: '#F3F6F9',
  },
});

export default function MyIconButton(props: ButtonProps) {
  return <StyledIconButton disableRipple {...props} />;
}
