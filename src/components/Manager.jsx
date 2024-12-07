import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Client, Databases, ID } from 'appwrite';
const Manager = () => {
    const projectid = import.meta.env.VITE_PROJECT_ID
    const DatabaseID = import.meta.env.VITE_DB
    const CollectionID = import.meta.env.VITE_CID
    const [form, setform] = useState({
        site: "",
        username: "",
        password: "",
        id: null
    })
    const [passwords, setpasswords] = useState([])
    useEffect(() => {
        (async function getting() {
            const result = await databases.listDocuments(
                `${DatabaseID}`,
                `${CollectionID}`,
            );
            setpasswords(result.documents)
        }())

    }, [passwords])
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(`${projectid}`);
    const databases = new Databases(client);
    const ref = useRef();
    const passref = useRef();
    const hidepass = useRef([]);
    const hidepassspan = useRef([]);
    const showpassword = () => {
        if (ref.current.innerHTML.trim() === "visibility") {
            passref.current.type = "password";
            ref.current.innerHTML = "visibility_off";
        }
        else {
            passref.current.type = "text";
            ref.current.innerHTML = "visibility";
        }
    }
    const showhidepass = (key) => {
        if (hidepassspan.current[key].innerHTML.trim() === "visibility") {
            hidepass.current[key].type = "password";
            hidepassspan.current[key].innerHTML = "visibility_off";

        }
        else {
            hidepass.current[key].type = "text";
            hidepassspan.current[key].innerHTML = "visibility";
        }

    }
    const handleinput = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });

    }

    const savepassword = async () => {
        if (form.id) {
          await databases.getDocument(`${DatabaseID}`, `${CollectionID}`, form.id)
          .then(async()=>{

              await databases.deleteDocument(
                  `${DatabaseID}`,
                  `${CollectionID}`,
                  `${form.id}`)
            })
        }
        if (form.site.trim() !== "" && form.username.trim() !== "" && form.password.trim() !== "") {
            await databases.createDocument(
                `${DatabaseID}`,
                `${CollectionID}`,
                ID.unique(),
                { "URL": form.site, "Username": form.username, "Password": form.password }
            )
            toast('Password Added Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            setform({
                site: "",
                username: "",
                password: "",
            })
        }
    }
    const copytext = (text) => {
        toast('Copied', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }
    const editpass = async (id_1) => {
        const pass = await databases.getDocument(`${DatabaseID}`, `${CollectionID}`, id_1);
        setform({ site: pass.URL, username: pass.Username, password: pass.Password, id: id_1 })
    }
    const deletepass = async (id) => {
        if (confirm("Do You really want to delete this password?")) {

            await databases.deleteDocument(
                `${DatabaseID}`,
                `${CollectionID}`,
                `${id}`
            ).then(() => {
                setpasswords([...passwords].filter(item => item.$id !== id))
                toast.success('Password Deleted Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });
            })
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
            />

            <div className="absolute top-0 z-[-2] h-screen w-screen bg-orange-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="mx-auto max-w-[80%] px-24 py-2 text-center flex flex-col items-center">
                <div className="logo font-bold text-xl flex items-center justify-center">
                    <span className='text-orange-500 font-extrabold text-2xl'>&lt;</span>
                    <span className='font-extrabold text-2xl'>Pass</span>
                    <span className='text-orange-500 font-extrabold  text-2xl'>UP/&gt;</span>
                </div>
                <p className='text-orange-600  text-center text-lg font-sans'>Your own password manager</p>
                <div className="inputs flex flex-col inp w-full p-5 gap-5 ">
                    <input  autoComplete='off' value={form.site} onChange={handleinput} name='site' placeholder='Enter Website URL' className='font-[600] rounded-3xl border border-orange-500 w-full px-6 py-1' type="text" />
                    <div className=" flex  gap-3">
                        <input autoComplete='off' value={form.username} onChange={handleinput} name='username' id='user' placeholder='Enter Username' className='font-[600] rounded-3xl border border-orange-500 w-full px-6 py-1' type="text" />
                        <div className="relative">

                            <input ref={passref} value={form.password} onChange={handleinput} name='password' placeholder='Enter Password' className='font-[600] rounded-3xl border border-orange-500 w-full px-6 py-1' type="password" />
                            <span ref={ref} className='absolute right-[4px] top-[4px]  cursor-pointer text-xl material-symbols-outlined' onClick={showpassword} title='hide/show'>
                                visibility_off
                            </span>
                        </div>
                    </div>

                </div>
                <button onClick={savepassword} className='flex flex-row-reverse items-center justify-between w-fit bg-orange-500 rounded-full px-5 py-2 text-white gap-2 font-medium transition-all duration-75 hover:bg-[#ff6a02]' title='Add Password'>Save
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

                    <table className="table-auto w-full text-center  rounded-md overflow-hidden block overflow-y-auto h-[170px] scrollbar-custom ">
                        <thead className=' bg-orange-600 text-white '>
                            <tr>
                                <th className='py-2 w-[33%] '>Site</th>
                                <th className='py-2  w-[50%] '>Username</th>
                                <th className='py-2 w-[50%]'>Password</th>
                                <th className='py-2 w-[50%]'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-orange-100 h-[100px]  overflow-scroll'>
                            {passwords.map((i, key) => {
                                return (
                                    <tr key={key}>
                                        <td className='font-medium text-center py-2 min-w-52 max-w-60 '>
                                            <div className='flex items-center justify-center ' >

                                                <a className='font-semibold' href={i.URL} target='_blank'>{i.URL}</a>
                                                <div className='h-[20px] cursor-pointer' title='copy' onClick={() => { copytext(i.URL) }} >

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/fjvfsqea.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#000000,secondary:#000000"
                                                        style={{ width: "35px ", height: "20px" }}
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='font-medium text-center py-2 min-w-52 max-w-60'>
                                            <div className='flex items-center justify-center '>
                                                <span className='font-semibold'>
                                                    {i.Username}
                                                </span>
                                                <div title='Copy' className='h-[20px] cursor-pointer' onClick={() => copytext(i.Username)} >

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/fjvfsqea.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#000000,secondary:#000000"
                                                        style={{ width: "35px ", height: "20px" }}
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='font-medium text-center py-2 min-w-52 max-w-60'>
                                            <div className='flex items-center justify-center '>
                                                <input name='pass-inp' ref={(r) => { hidepass.current[key] = r }} type="password" value={i.Password} className='bg-none outline-none w-[70px] max-w-[80px] ' disabled={true} />

                                                <div className='h-[20px] cursor-pointer' title='copy' onClick={() => copytext(i.Password)} >

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/fjvfsqea.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#000000,secondary:#000000"
                                                        style={{ width: "35px ", height: "20px" }}
                                                    >
                                                    </lord-icon>
                                                </div>
                                                <span onClick={() => { showhidepass(key) }} ref={(r) => { hidepassspan.current[key] = r }} className='cursor-pointer text-lg material-symbols-outlined' title='show/hide'>
                                                    visibility_off
                                                </span>
                                            </div>
                                        </td>
                                        <td className='font-medium text-center py-2 min-w-32 max-w-60'>
                                            <div className='flex items-center justify-center gap-7'>
                                                <span className='cursor-pointer' title='edit' onClick={() => { editpass(i.$id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#0000,secondary:#0000"
                                                        style={{ width: "30px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer' title='delete' onClick={() => { deletepass(i.$id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/hwjcdycb.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#0000,secondary:#0000"
                                                        style={{ width: "30px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>

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
