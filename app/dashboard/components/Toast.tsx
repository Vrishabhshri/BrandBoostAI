import React from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 w-80 transition-transform duration-300 ease-in-out scale-100 opacity-100">
      <div className="flex justify-between items-center">
        <p className="flex-1">{message}</p>
        <button onClick={onClose} className="ml-4 text-white font-bold hover:text-blue-300 transition-colors duration-200">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast; 