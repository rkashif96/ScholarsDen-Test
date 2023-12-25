import React from 'react';

interface MyButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
  className: string;
}

const MyButton: React.FC<MyButtonProps> = ({ type, text, className }) => (
  <button type={type} className={`bg-blue-500 text-white py-2 px-4 rounded ${className}`}>
    {text}
  </button>
);

export default MyButton;
