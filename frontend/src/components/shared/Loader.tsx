import React from 'react'

const Loader = (): React.JSX.Element => {
  return (

    <>
    <div className="fixed inset-0 z-10 bg-black opacity-30"> </div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex space-x-6">
                <div className="w-8 h-8 bg-white rounded-full animate-bounce-first"></div>
                <div className="w-8 h-8 bg-white rounded-full animate-bounce-second"></div>
                <div className="w-8 h-8 bg-white rounded-full animate-bounce-third"></div>
            </div>
        </div>
    </>
   
  )
}

export default Loader