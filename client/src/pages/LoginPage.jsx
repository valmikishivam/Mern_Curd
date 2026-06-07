import { Eye, EyeClosed, Loader } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { } from 'react-hot-toast'
const baseurl = import.meta.env.VITE_BACKEND_URL;
function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const navigate =useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error('password must be atleast 8 character long');
      return
    }

    try {
      setLoading(true);
      const res = await axios.post(`${baseurl}/api/login`, { email, password },{withCredentials:true});
      if (res.status == 200 || res.status == 201) {
        toast.success(res.data.msg)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.msg || error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-2xl border shadow-md shadow-gray-500 rounded-sm p-2'>
        <h1 className='text-2xl lg:3xl text-center'>Login</h1>
        <form className='flex flex-col gap-y-2 p-2' onSubmit={handleLogin}>

          <label>Email</label>
          <input type="email" placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 outline-none border-2 border-gray-500' required />
          <label>Password</label>
          <div className='px-1 flex items-center gap-x-1 border-2 border-gray-500'>
            <input type={show ? "text" : "password"} placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} className='flex-1 p-2 outline-none' required />
            <span onClick={() => setShow((prev) => !prev)}>{show ? <EyeClosed /> : <Eye />}</span>
          </div>
          <button className='bg-blue-500 text-white flex items-center  justify-center gap-x-1 p-2'>
            Login {loading && <Loader className='animate-spin' />}
          </button>
        </form>
        <p>want to create an account ?<Link to={'/signup'} className='text-blue-500 font-semibold'> Signup</Link></p>
      </div>
    </div>
  )
}

export default LoginPage