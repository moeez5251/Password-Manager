import React from 'react'

const Manager = () => {
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-orange-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="mx-auto max-w-[80%] px-24 py-6 text-center flex flex-col items-center">
                <div className="logo font-bold text-xl flex items-center justify-center">
                    <span className='text-orange-500 font-extrabold text-2xl'>&lt;</span>
                    <span className='font-extrabold text-2xl'>Pass</span>
                    <span className='text-orange-500 font-extrabold  text-2xl'>OP/&gt;</span>
                </div>
                <p className='text-orange-600  text-center text-lg font-sans'>Your own password manager</p>
                <div className="inputs flex flex-col inp w-full p-5 gap-5 ">
                    <input placeholder='Enter Website URL' className='rounded-3xl border border-orange-500 w-full px-6 py-1' type="text" />
                    <div className=" flex  gap-3">
                        <input placeholder='Enter Username' className='rounded-3xl border border-orange-500 w-full px-6 py-1' type="text" />
                        <div className="relative">

                            <input placeholder='Enter Password' className='rounded-3xl border border-orange-500 w-full px-6 py-1' type="text" />
                            <span className='absolute right-0 top-0'>show</span>
                        </div>
                    </div>

                </div>
                <button className='flex flex-row-reverse items-center justify-between w-fit bg-orange-500 rounded-full px-5 py-2 text-white gap-2 font-medium transition-all duration-75 hover:bg-[#ff6a02]'>Add Password
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="loop"
                        delay="600"
                        colors="primary:#ffffff"
                    >
                    </lord-icon>
                </button>
            </div>
        </>
    )
}

export default Manager
