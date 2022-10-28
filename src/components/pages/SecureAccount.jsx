import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'

export default function SecureAccount( {setCurrentUser, currentUser}){
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const { userId } = useParams()
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(()=> {
        setForm(currentUser)
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/edit`, form)
            const { token } = response.data
            localStorage.setItem("jwt", token)
            const decode = jwt_decode(token)
            setCurrentUser(decode)
            navigate(`/profile`)
        } catch(err) {
            console.warn(err)
        }
    }

    return(
        <div>
                <section className=" py-1 bg-black">
    <div className="w-full lg:w-8/12 px-4 mx-auto mt-6 bg-black">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-black border-0">
        <div className="rounded-t bg-black mb-0 px-6 py-6 ">
        <div className="text-center flex justify-between">
            <h6 className="text-secondary text-4xl font-code">
            Secure Account Settings
            </h6>
        </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
            <h6 className="text-primary text-2xl mt-3 mb-6 uppercase font-code">
            User Information
            </h6>
            <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-m font-code text-db mb-2" htmlFor="email">
                        Email
                    </label>
                    <input type="email" required className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={form.email} id="email" onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-m font-code text-db mb-2" htmlFor="email">
                        Old Password
                    </label>
                    <input type="password" required className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={form.password} id="password" oonChange={e => setForm({...form, password: e.target.value})} />
                </div>
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-m font-code text-db mb-2" htmlFor="email">
                        New Password
                    </label>
                    <input type="password" required className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={form.password} id="password" oonChange={e => setForm({...form, newPassword: e.target.value})} />
                </div>
            </div>
            </div>
            
        </form>
        </div>
    </div>
    </div>
    </section>
        </div>
    )
}