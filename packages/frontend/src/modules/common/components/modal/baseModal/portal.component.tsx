import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export const ModalPortal: React.FC<PortalProps> = ({ children }) => {
  const modalRoot = document.getElementById('modal');
  if (!modalRoot) return null;
  return ReactDOM.createPortal(children, modalRoot);
};
