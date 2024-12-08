import React from 'react'
import { Client, Account } from 'appwrite';
import { useForm } from "react-hook-form";
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router';
import Navbar from './navbar';
const Signin = () => {
  let navigate = useNavigate();
  const projectid = import.meta.env.VITE_PROJECT_ID
  const { register, handleSubmit, formState: { errors } } = useForm();
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
  const onSubmit = async (data) => {
    const promise = account.createEmailPasswordSession(`${data.email1}`, `${data.password1}`);
    promise.then(function () {
      toast.success("Login Successfully ", {

        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",

      });
      navigate("/main");
    }, async function (e) {
      console.log(e);
      toast.error("Invalid email / password", {
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
      <Navbar />
      <div className=' flex items-center relative sm:top-24 top-16 flex-col gap-10 signin-page'>

        <h2 className='text-white font-bold text-3xl'>Sign In</h2>
        <div className='flex flex-col w-full items-center '>
          <form className='text-white flex flex-col  gap-6 sm:w-1/2 w-[80%]' onSubmit={handleSubmit(onSubmit)}>
            {errors.email1 ? <span className='text-center text-red-400 font-extrabold text-base'>Email is required</span> : errors.password1 ? <span className='text-center text-red-400 font-extrabold text-base'>Password is required</span> : ""}

            <input type='email' placeholder='Enter Your Email' className='text-sm py-2 px-4 rounded-lg  text-black font-bold outline-none placeholder:text-black' {...register("email1", { required: true })} />
            <div className='w-full relative'>
              <input type={inp} placeholder='Enter Your Password' className='text-sm py-2 px-4 rounded-lg w-full text-black font-bold outline-none placeholder:text-black' {...register("password1", { required: true })} />
              <span onClick={handleinp} ref={ref} className='absolute right-[4px] top-[4px] text-black  cursor-pointer text-xl material-symbols-outlined' title='hide/show'>
                visibility_off
              </span>

            </div>

            <button className='bg-black w-fit mx-auto px-4 py-2 rounded-xl font-semibold  border-2 border-black hover:border-white ' type='submit'>Login</button>
            <p className='text-center'>No Acount ? <NavLink to="/" className='text-yellow-300 font-extrabold cursor-pointer login'  >Sign Up</NavLink> here</p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signin