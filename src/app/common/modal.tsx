import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure client-side rendering for portals
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement // Ensure this div exists in your _document.tsx or public/index.html
  );
};

export default Modal;