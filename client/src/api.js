import axios from 'axios';
import toast from 'react-hot-toast'
const baseurl = import.meta.env.VITE_BACKEND_URL
export const logout = async (navigate) => {
    try {
        const res = await axios.get(`${baseurl}/api/logout`, { withCredentials: true });
        if (res.status == 200 || res.status == 201) {
            toast.success(res.data.msg)
            navigate('/login')
        }
    } catch (error) {
        toast.error(error.response.data.msg || error.message)
    }
}
export const deleteContract =async(id)=>{
    try {
        const res = await axios.delete(`${baseurl}/api/contract/${id}`,{withCredentials:true});
        if(res.status==200){
            toast.success(res.data.msg)
        }
    } catch (error) {
        toast.error(error.response.data.msg || error.message)
    }
}