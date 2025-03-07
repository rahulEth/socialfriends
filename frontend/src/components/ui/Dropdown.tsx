import React from 'react'

import DropdownInput from '../shared/DropdownComponent';

const Dropdown = (): React.JSX.Element => {
    // const options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    const options: string[] = ['environment-campaign', 'garbage-cleaning', 'eco-product', 'eco-farming', 're-forestration', 'eco-transport'];

  return (

    <div className="flex justify-center items-center bg-gray-100">

      <DropdownInput 
      options={options} 
      />


    </div>
  )



}

export default Dropdown