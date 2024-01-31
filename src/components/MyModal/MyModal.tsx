import {
  Box,
  Button,
  ButtonProps,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  ModalProps,
  Typography,
} from '@mui/joy';
import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  ModalProps?: ModalProps;
  footer?: ReactNode;
  OkButtonProps?: ButtonProps;
  CancelButtonProps?: ButtonProps;
}

export default function MyModal({
  open,
  onClose,
  children,
  title,
  ModalProps,
  OkButtonProps,
  CancelButtonProps,
}: PropsWithChildren<Props>) {
  return (
    <Modal {...ModalProps} open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        {typeof title === 'object' ? (
          title
        ) : (
          <Typography level='title-lg'>{title}</Typography>
        )}
        <Box sx={{ overflow: 'auto' }}>{children}</Box>
        
      </ModalDialog>
    </Modal>
  );
}
