import React from 'react'
import { Client, Account } from 'appwrite';
import { useForm } from "react-hook-form";
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router';
import Navbar from './navbar';
const Login = () => {
    const projectid = import.meta.env.VITE_PROJECT_ID
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const ref = useRef();
    const [inp, setinp] = useState("password")
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(`${projectid}`);
    const account = new Account(client);
    const handleinp = () => {
        if (ref.current.innerHTML.trim() === "visibility") {
            ref.current.innerHTML = "visibility_off";
            setinp("password");
        }
        else {
            setinp("text");
            ref.current.innerHTML = "visibility";
        }
    }
    const onSubmit = data => {
        if (data.password.length < 8) {
            toast.error('Password is too short', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        account.create(`${data.name}`, `${data.email}`, `${data.password}`, `${data.name}`)
            .then(function () {
                toast.success("Account Created Successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });
                reset();
            }, function () {
                toast.error("User with this credentials already exist", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });
            });
       
    }
 

   

    return (
        < >
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
            />

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">

            </div>
            <Navbar/>
            <div className=' flex items-center relative top-9 lg:top-5  flex-col gap-10 lg:gap-5 signup-page'>

                <h2 className='text-white font-bold text-3xl'>Sign Up</h2>
                <div className='flex flex-col w-full items-center '>
                    <form className='text-white flex flex-col gap-6 sm:w-1/2 w-[80%]' onSubmit={handleSubmit(onSubmit)}>
                        {errors.name ? <span className='text-center text-red-400 font-extrabold text-base'>Name is required</span> : errors.email ? <span className='text-center text-red-400 font-extrabold text-base'>Email is required</span> : errors.password ? <span className='text-center text-red-400 font-extrabold text-base'>Password is required</span> : ""}
                        <input type='text' placeholder='Enter Your Name ' className='text-sm py-2 px-4 rounded-lg  text-black font-bold outline-none placeholder:text-black' {...register("name", { required: true })} />
                        <input type='email' placeholder='Enter Your Email' className='text-sm py-2 px-4 rounded-lg  text-black font-bold outline-none placeholder:text-black' {...register("email", { required: true })} />
                        <div className='w-full relative'>
                            <input type={inp} placeholder='Enter Your Password' className='text-sm py-2 px-4 rounded-lg w-full text-black font-bold outline-none placeholder:text-black' {...register("password", { required: true })} />
                            <span onClick={handleinp} ref={ref} className='absolute right-[4px] top-[4px] text-black  cursor-pointer text-xl material-symbols-outlined' title='hide/show'>
                                visibility_off
                            </span>

                        </div>

                        <button className='bg-black w-fit mx-auto px-4 py-2 rounded-xl font-semibold  border-2 border-black hover:border-white ' type='submit'>Sign Up</button>
                        <p className='text-center'>Already have account? Click here <NavLink to="/login" className='text-yellow-300 font-extrabold cursor-pointer login '>Login</NavLink></p>
                    </form>
                </div>
            </div>
         
        </>
    )
}

export default Login
