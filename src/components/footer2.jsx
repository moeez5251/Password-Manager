import React from 'react'

const Footer2 = () => {
    return (
        <div className='flex items-center fixed bottom-0 w-full font-bold justify-around bg-[#0d022d] py-2'>
            <div className="logo font-bold text-xl flex items-center justify-center">
                <span className='text-orange-500 font-extrabold text-sm:2xl text-xl'>&lt;</span>
                <span className='font-extrabold sm:text-2xl text-xl text-white'>Pass</span>
                <span className='text-orange-500 font-extrabold  sm:text-2xl text-xl'>UP/&gt;</span>
            </div>
            <div className='flex items-center justify-center text-white'>

            Created with <img width={30} src="assets/Heart.png" alt="" /> By Xheikh
            </div>
        </div>
    )
}

export default Footer2
