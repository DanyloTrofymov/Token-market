import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import { COLORS, SPACES, BORDERS, BREAKING_POINTS } from '../../../../theme';

export const ModalOverlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${COLORS.modalBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled(Box)`
  background-color: ${COLORS.white};
  border-radius: ${BORDERS.modalRadius};
  padding: ${SPACES.m};
  min-width: 30vw;
  width: 50vw;
  max-width: 70vw;
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    min-width: 70vw;
    max-width: 90vw;
  }
  @media (max-width: ${BREAKING_POINTS.mobile}) {
    min-width: 90vw;
    max-width: 90vw;
  }
`;

export const ModalHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${SPACES.m};
  margin-right: auto;
`;

export const CloseButton = styled(Button)`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-left: auto;
  color: ${COLORS.cancelButton};
  border-radius: ${BORDERS.buttonRadius};
`;

export const ModalBody = styled(Box)`
  padding-bottom: ${SPACES.l};
  word-wrap: break-word;
`;

export const ModalButtons = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    margin: 0 ${SPACES.l};
  }
`;
/* Add any additional styles as needed */
