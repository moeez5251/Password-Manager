import React from 'react'
import { useRef, useState, useEffect } from 'react'
const Manager = () => {
    const [form, setform] = useState({
        site: "",
        username: "",
        password: ""
    })
    const [passwords, setpasswords] = useState([])
    useEffect(() => {
        if (localStorage.getItem("passmanager")) {
            let oldpasswords = JSON.parse(localStorage.getItem("passmanager"));
            setpasswords(oldpasswords)

        }
        else {
            localStorage.setItem("passmanager", []);
        }

    }, [])

    const ref = useRef();
    const showpassword = () => {
        if (ref.current.innerHTML.trim() === "visibility") {
            ref.current.innerHTML = "visibility_off";
        }
        else {
            ref.current.innerHTML = "visibility";
        }

    }
    const handleinput = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });

    }
    const savepassword = () => {
        setpasswords([...passwords, form])
        localStorage.setItem("passmanager", JSON.stringify([...passwords, form]))
    }
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
                    <input value={form.site} onChange={handleinput} name='site' placeholder='Enter Website URL' className='rounded-3xl border border-orange-500 w-full px-6 py-1' type="text" />
                    <div className=" flex  gap-3">
                        <input value={form.username} onChange={handleinput} name='username' placeholder='Enter Username' className='rounded-3xl border border-orange-500 w-full px-6 py-1' type="text" />
                        <div className="relative">

                            <input value={form.password} onChange={handleinput} name='password' placeholder='Enter Password' className='rounded-3xl border border-orange-500 w-full px-6 py-1' type="password" />
                            <span ref={ref} className='absolute right-[4px] top-[4px]  cursor-pointer text-xl material-symbols-outlined' onClick={showpassword}>
                                visibility_off
                            </span>
                        </div>
                    </div>

                </div>
                <button onClick={savepassword} className='flex flex-row-reverse items-center justify-between w-fit bg-orange-500 rounded-full px-5 py-2 text-white gap-2 font-medium transition-all duration-75 hover:bg-[#ff6a02]'>Add Password
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="loop"
                        delay="600"
                        colors="primary:#ffffff"
                    >
                    </lord-icon>
                </button>
            </div>
            <div className="passwords max-w-[70%] mx-auto">
                <h2 className='font-bold text-xl mb-2'>Your Passwords</h2>
                {passwords.length === 0 && <div>No Password to show</div>}
                {passwords.length !== 0 &&

                    <table className="table-auto w-full text-center  rounded-md overflow-hidden ">
                        <thead className=' bg-orange-600 text-white '>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-orange-100 h-[100px]  overflow-scroll'>
                            {passwords.map((i,key) => {
                                return (
                                    <tr key={key}>
                                        <td className='font-medium text-center py-2 min-w-52 max-w-60'><a href={i.site} target='_blank'>{i.site}</a></td>
                                        <td className='font-medium text-center py-2 min-w-52 max-w-60'>{i.username}</td>
                                        <td className='font-medium text-center py-2 min-w-52 max-w-60'>{i.password}</td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>}
            </div>
        </>
    )
}

export default Manager
