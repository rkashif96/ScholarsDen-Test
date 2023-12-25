import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface MySearchableDropdownProps {
  options: any;
  onSelect: any;
  label: any;
}

const MySearchableDropdown: React.FC<MySearchableDropdownProps> = ({
  options,
  label,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative my-searchable-dropdown">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative align-middle">
        <div
          onClick={handleToggleDropdown}
          className={`cursor-pointer border rounded-md p-2 focus:outline-none ${isOpen ? 'bg-slate-400' : 'bg-slate-300'} `}
        >
          {selectedOption || 'Select an option'}
        </div>
        <FiChevronDown
          className={`absolute top-1/2 right-2 -my-2 transform ${isOpen ? 'rotate-180' : ''
            }`}
          style={{ width: '20px', height: '20px' }}
          onClick={handleToggleDropdown}
        />

      </div>
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border-b focus:outline-none"
          />
          <ul className="py-2">
            {options.map((option: any) => (
              <li
                key={option}
                onClick={() => handleSelectOption(option)}
                className="cursor-pointer hover:bg-gray-100 p-2"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MySearchableDropdown;
