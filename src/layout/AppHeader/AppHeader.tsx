import { DragHandle } from '@mui/icons-material';
import AccountMenu from './AccountMenu';
import './AppHeader.scss';
import MyIconButton from '@/components/MyIconButton/MyIconButton';
import useCheckScreen from '@/hooks/useCheckScreen';

interface Props {
  toggleOpenSideBar: () => void;
}

export default function AppHeader({ toggleOpenSideBar }: Props) {
  const { isMobile } = useCheckScreen();

  return (
    <div className='header-wrapper'>
      {isMobile && (
        <MyIconButton onClick={toggleOpenSideBar}>
          <DragHandle fontSize='small' color='primary' />
        </MyIconButton>
      )}
      <div className='content' />
      <AccountMenu />
    </div>
  );
}
