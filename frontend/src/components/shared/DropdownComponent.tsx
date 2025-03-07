// components/DropdownInput.js
import React, { useEffect, useState } from 'react';

import { UseStateManagement } from '../../../StateManagement';

interface DropdownProps{

  options: string[]

}

const DropdownInput: React.FC<DropdownProps> = ( {options} ): React.JSX.Element => {

  const [isOpen, setIsOpen] = useState<boolean>(false);


  const {selectedItem , setSelectedItem , setTokenAmount} = UseStateManagement();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown when an item is selected
  };

  const setTokenValue = () => {

    try {

      switch(selectedItem){
        case "environment-campaign":
          setTokenAmount("5000");
          break;
  
        case "garbage-cleaning":
          setTokenAmount("2500");
          break;
  
        case "eco-product":
          setTokenAmount("2000");
          break;
  
        case "eco-farming":
          setTokenAmount("5000");
          break;
  
        case "re-forestration":
          setTokenAmount("1000");
          break;
        
        case "eco-transport":
          setTokenAmount("1000");
          break;
  
        default:
          setTokenAmount("0");
          break;
          
  
      }

      // console.log("The set Value is" , value);

    } catch (error) {

      console.log(error);
      
    }

  }

  useEffect(() => {

    selectedItem && setTokenValue();

  }, [selectedItem])


  return (
    <div className="relative w-72">
      <button
        onClick={toggleDropdown}
        className="w-full p-3 border border-gray-300 rounded-md text-left flex items-center justify-between bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {selectedItem || 'Select an option'}
        <span className="ml-2 ">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelectItem(option)}
              className="p-2 cursor-pointer hover:bg-indigo-500 hover:text-white"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default DropdownInput;