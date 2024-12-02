import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white  justify-between  h-16 py-2 '>
      <div className='flex items-center justify-between max-w-[70%] mx-auto h-full '>

      <div className="logo font-bold text-xl flex items-center">
        <span className='text-orange-400 font-extrabold text-2xl'>&lt;</span>
        <span className='font-bold text-2xl'>Pass</span>
        <span className='text-orange-400 font-extrabold text-2xl'>OP/&gt;</span>
      </div>
      <ul className='flex gap-6'>
        <a className="font-regular hover:font-bold" href="/">Home</a>
        <a className="font-regular hover:font-bold" href="/about">About</a>
        <a className="font-regular hover:font-bold" href="/about">Contact</a>

      </ul>
      </div>
    </nav >
  )
}

export default Navbar
