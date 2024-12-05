import React from 'react'

const Footer = () => {
    return (
        <div className='flex items-center absolute bottom-0 w-full font-bold justify-around bg-slate-900 py-2'>
            <div className="logo font-bold text-xl flex items-center justify-center">
                <span className='text-orange-500 font-extrabold text-2xl'>&lt;</span>
                <span className='font-extrabold text-2xl text-white'>Pass</span>
                <span className='text-orange-500 font-extrabold  text-2xl'>OP/&gt;</span>
            </div>
            <div className='flex items-center justify-center text-white'>

            Created with <img width={30} src="assets/Heart.png" alt="" /> By Xheikh
            </div>
        </div>
    )
}

export default Footer
