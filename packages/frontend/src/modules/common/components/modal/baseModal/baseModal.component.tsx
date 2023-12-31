import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import ReactDom from 'react-dom';
import { ModalBody, ModalButtons, ModalHeader, ModalOverlay, Modal } from './baseModal.styled';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  buttons?: ReactNode;
}

export const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, buttons }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <ModalOverlay onClick={onClose}>
      <Modal
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ModalHeader>
          <h2>{title}</h2>
          <Button onClick={onClose} variant="outlined" color="error" sx={{ ml: 'auto' }}>
            X
          </Button>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>
        {buttons && <ModalButtons className="modal-buttons">{buttons}</ModalButtons>}
      </Modal>
    </ModalOverlay>,
    document.getElementById('modal') as HTMLElement
  );
};
