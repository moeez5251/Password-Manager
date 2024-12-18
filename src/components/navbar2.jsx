import React from 'react'
import { useEffect,useRef } from 'react';
import { useNavigate } from 'react-router';
import { Client, Account } from 'appwrite';
const Navbar = () => {
    const projectid = import.meta.env.VITE_PROJECT_ID
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("cookieFallback") === "[]" || localStorage.getItem("cookieFallback") === null) {
         
            navigate("/login");
        }
    }, [])
    const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(`${projectid}`);
    const account = new Account(client);
    const handledeletesession=()=>{
        account.deleteSessions();
        navigate("/");
    }
    const back=useRef();
    useEffect(() => {
       ( async () => {
            let user=await account.get();
            back.current.innerHTML=user.$id.charAt(0).toUpperCase();
            var randomColor = Math.floor(Math.random() * 16777215).toString(16)
            back.current.style.backgroundColor="#"+randomColor;
            back.current.title=user.$id;
        })()
    
      
    }, [])
    
    return (
        <nav className='bg-slate-900 text-white  justify-between  h-16 py-2 relative '>
            <div className='flex items-center justify-between max-w-[90%] sm:max-w-[70%] mx-auto h-full'>

                <div className="logo font-bold text-xl flex items-center">
                    <span className='text-orange-400 font-extrabold text-2xl'>&lt;</span>
                    <span className='font-bold text-2xl'>Pass</span>
                    <span className='text-orange-400 font-extrabold text-2xl'>UP/&gt;</span>
                </div>

                <button
                    
                    className="btn bg-none p-1 rounded-xl shadow-lg shadow-[#00000026] hover:shadow-inner transform transition-all duration-500 hover:translate-y-1 border border-transparent hover:border-[#0000001A] cursor-pointer w-[50px] overflow-hidden hover:w-[110px] flex gap-7"
                >
                    <div ref={back} className="text-white text-2xl font-bold  rounded-full px-[10px] py-[4px]"></div>

                        <span onClick={handledeletesession}
                            title="logout"
                            className="material-symbols-outlined text-white text-3xl"
                        >
                            logout
                        </span>
                    {/* </div> */}
                </button>
            </div>

        </nav >
    )
}

export default Navbar
