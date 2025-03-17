import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
      <div>{message}</div>
      <button onClick={onClose} className="ml-4 underline">Close</button>
    </div>
  );
};

export default Toast; 