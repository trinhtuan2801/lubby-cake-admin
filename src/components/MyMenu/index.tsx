import { Menu, MenuProps, styled } from '@mui/material';

const StyledMenu = styled(Menu)({});

export default function MyMenu(props: MenuProps) {
  return (
    <StyledMenu
      slotProps={{
        paper: {
          sx: {
            boxShadow: 'rgba(170, 180, 190, 0.3) 0px 4px 20px',
            border: '1px solid rgb(218, 226, 237)',
          },
        },
      }}
      {...props}
    />
  );
}
