import axios from "axios"
import { Loader, X } from "lucide-react"
import { useState } from "react"
import toast from 'react-hot-toast'
const baseurl = import.meta.env.VITE_BACKEND_URL;


function Cuform({ name, updateid, closeDialoge }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false)

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = {}
      
      if (username) data.username = username
      if (email) data.email = email
      if (phone) data.phone = phone
      if (role) data.role = role
      setLoading(true)
      const res = name=='add'? await axios.post(`${baseurl}/api/contract/add`, data, { withCredentials: true }):
        await axios.put(`${baseurl}/api/contract/${updateid}`, data, { withCredentials: true })

      if (res.status == 200 || res.status == 201) {
        toast.success(res.data.msg)
        closeDialoge();
      }
    } catch (error) {
      toast.error(error.response.data.msg || error.message)
    } finally { setLoading(false) }
  }

  return (
    <div className={name ? 'w-full h-full fixed inset-0 z-50 bg-[rgba(0,0,0,0.3)] flex justify-center items-center backdrop-blur-sm' : 'hidden'}>
      <div className='max-w-2xl w-full p-2 border bg-white relative'>
        <h1 className="text-2xl lg:text-3xl text-blue-500 text-center my-2">{name == 'add' ? 'New contract' : 'Update Contract'}</h1>
        <form className="grid grid-cols-1 lg:grid-cols-2 py-2 gap-1" onSubmit={handleForm}>
          <input type="text" placeholder="Enter name" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 border-2 outline-2 outline-blue-500" />
          <input type="email" placeholder="Enter mail" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border-2 outline-2 outline-blue-500" />
          <input type="text" placeholder="Enter 10 digits phone number" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} className="p-2 border-2 outline-2 outline-blue-500" />
          <select className="p-1" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value='' defaultChecked>choose a role</option>
            <option value={'accounting'}>Accounting</option>
            <option value={'markting'}>Marketing</option>
            <option value={'designer'}>Desiner</option>
            <option value={'hr'}>HR</option>
            <option value={'manager'}>Manager</option>
          </select>
          {
            loading ? (
              <div className="md:col-span-2 place-items-center p-2">
                <Loader className="animate-spin text-blue-500" />
              </div>
            ) : (
              <button className=" md:col-span-2 md:w-80 md:mx-auto p-1 rounded-sm my-2 place-items-center bg-blue-500 text-white"
                type="submit">{name == 'add' ? 'New contract' : 'Update Contract'}
              </button>)
          }
        </form>
        <span className="absolute top-0 right-0 bg-red-500 text-white cursor-pointer" onClick={closeDialoge}>
          <X size={20} />
        </span>
      </div>
    </div>
  )
}

export default Cuform