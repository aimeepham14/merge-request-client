import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditProfile(props) {
    const [firstName, setFirstName] = useState(props.currentUser.firstName)
    const [email, setEmail] = useState(`${props.currentUser.email}`)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [form, setForm] = useState({})
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}`)
                console.log(response.data)
                setForm(response.data)
            } catch(err) {
                console.warn(err)
            }
        }
        getUser()
    }, [userId])
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/edit`, form)
            navigate("/profile")
        } catch(err) {
            console.warn(err)
        }
    }


    return(
        <div>
            <div>Hello, {props.currentUser.firstName}</div>
            <div id="divAroundForm" className="bg-yellow-400 p-12 rounded-md mt-12 flex flex-col text-white drop-shadow-2xl text-2xl w-2/3 mx-auto">
                <form onSubmit = {handleSubmit}>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">First Name:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="firstName" placeholder="First Name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}  />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Last Name:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="firstName" placeholder='First Name' onChange={e => setForm({...form, lastName: e.target.value})} value={form.lastName} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Email:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="email" placeholder='Email' onChange={e => setForm({...form, email: e.target.value})} value={form.email} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Gender:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="gender" placeholder='Gender' onChange={e => setForm({...form, gender: e.target.value})} value={form.gender} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">City:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="city" placeholder='City' onChange={e => setForm({...form, city: e.target.value})} value={form.city} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Favorite Programming Language:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="favoritePLanugage" placeholder='Favorite Programming Language' onChange={e => setForm({...form, favoritePLanguage: e.target.value})} value={form.favoritePLanguage} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Biography:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="biography" placeholder='Biography' onChange={e => setForm({...form, biography: e.target.value})} value={form.biography} />
                    </div>
                    <button type="submit" class="ml-2 p-3 bg-blue-600 rounded-md">Update!</button>
                    

                </form>
                
            </div>
        </div>
    )
}