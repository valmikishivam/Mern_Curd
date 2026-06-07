import { LogOut, SquarePen, Trash2, UserPlus } from 'lucide-react'
import Cuform from '../components/Cuform.jsx'
import { logout, deleteContract } from '../api.js'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const baseurl = import.meta.env.VITE_BACKEND_URL
function HomePage() {
  const [isShow, setIsShow] = useState(null);
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [members, setMembers] = useState([])
  const [editId, setEditId] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${baseurl}/api/me`, { withCredentials: true })
        if (res.data.isAuth == false) {
          navigate('/login')
        }

      } catch (error) {
        navigate('/login')
      }

    }
    checkAuth()
  }, [])

  useEffect(() => {
    const getContracts = async () => {
      const res = await axios.get(`${baseurl}/api/contract?page=${page}`, { withCredentials: true });
      setMembers(res.data.contacts);
      if (res.data.totalPage == page) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    }
    getContracts()
  }, [isShow, page])

  const deleteOne = (id) => {
    setMembers((prev) => prev.filter(c => c._id !== id))
    deleteContract(id)
  }

  const handleEdit = (id) => {
    setEditId(id);
    setIsShow('edit')
  }
  return (
    <>
      <div className=' relative w-full max-w-screen-xl  mx-auto lg:p-5 p-1'>
        <div className='w-full p-2 flex justify-between flex-col md:flex-row'>
          <div>
            <h1 className='text-blue-500 text-2xl lg:text-3xl'>Contract Manager</h1>
            <p className='text-sm my-2 text-gray-400'>manage your team members and details</p>
          </div>
          <button className='bg-blue-500 text-white  h-fit flex items-center justify-center gap-x-[2px] p-1 rounded-sm' onClick={() => setIsShow('add')}>
            <UserPlus size={20} />
            add contract
          </button>
        </div>

        <table className='md:table hidden w-full' >

          <thead>
            <tr>
              <td className='p-1 border-2 border-collapse border-black text-center font-bold'>Name</td>
              <td className='p-1 border-2 border-collapse border-black text-center font-bold'>Role</td>
              <td className='p-1 border-2 border-collapse border-black text-center font-bold'>Email</td>
              <td className='p-1 border-2 border-collapse border-black text-center font-bold'>Password</td>
              <td className='p-1 border-2 border-collapse border-black text-center font-bold'>
                Action
              </td>
            </tr>
          </thead>
          <tbody style={{textAlign:'center'}}>
            {
              members.length > 0 ? members.map(m => (
                <tr key={m._id}>
                  <td className='p-1'>{m.name}</td>
                  <td className='text-green-600 p-1'>{m.role}</td>
                  <td className='p-1'>{m.email}</td>
                  <td className='text-gray-500 p-1'>+91 {m.phone}</td>
                  <td className='flex justify-around items-center p-1'>
                    <SquarePen color='#16a34a' onClick={() => handleEdit(m._id)} />
                    <Trash2 color='#b91c1c' onClick={() => deleteOne(m._id)} />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className='text-center p-2 text-red-600 '>No contract added yet</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <section className='md:hidden block p-2'>
          {
            members.length > 0 ? members.map(m => (
              <div key={m._id} className='flex flex-col gap-y-1 p-2 mb-1 rounded-sm border-y  border-y-gray-200'>
                <h1>{m.name}</h1>
                <span className='text-green-600 border border-green-600 p-[2px] w-fit rounded-md text-sm'>{m.role}</span>
                <span>{m.email}</span>
                <span className='text-gray-500'>+91 {m.phone}</span>
                <div className='flex justify-end gap-x-2 items-center'>
                  <span className='bg-green-600 p-1 text-white rounded-full'
                    onClick={() => handleEdit(m._id)}><SquarePen size={18} /></span>
                  <span className='bg-red-700 p-1 text-white rounded-full'
                    onClick={() => deleteOne(m._id)}><Trash2 size={18} /></span>

                </div>
              </div>
            )) : (
              <div className='w-full text-center p-2 border-y border-collapse'>
                <h1>No contract added yet</h1>
              </div>
            )
          }
        </section>
        <div className='flex p-2 justify-between items-center border-y-2'>
          <div className='w-8 h-8 p-1 bg-red-500 rounded-full flex justify-center items-center'>
            <LogOut size={18} onClick={()=>logout(navigate)} />
          </div>
          {members.length > 0 && <div className='flex items-center gap-x-2'>
            <button className='px-4 py-[2px] bg-blue-500 text-white rounded-sm disabled:bg-gray-200' disabled={page < 2} onClick={() => setPage((prev) => prev - 1)}>prev</button>
            <span>{page}</span>
            <button className='px-4 py-[2px] bg-blue-500 text-white rounded-sm disabled:bg-gray-200' disabled={!hasMore} onClick={() => setPage((prev) => prev + 1)}>next</button>
          </div>}
        </div>
      </div>
      {isShow && <Cuform name={isShow} updateid={editId} closeDialoge={() => setIsShow(null)} />}
    </>
  )
}

export default HomePage

