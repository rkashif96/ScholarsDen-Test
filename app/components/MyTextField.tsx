import React, { ChangeEvent } from 'react';

interface MyTextFieldProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MyTextField: React.FC<MyTextFieldProps> = ({ label, type, placeholder, name, onChange }) => (
  <div className="mb-3">
    <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  </div>
);

export default MyTextField;
