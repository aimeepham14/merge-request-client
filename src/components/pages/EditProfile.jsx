import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditProfile(props) {
    const [firstName, setFirstName] = useState(props.currentUser.firstName)
    const [email, setEmail] = useState(`${props.currentUser.email}`)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [allInfo, setAllInfo] = useState({})
    const { userId } = useParams()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}`)
                console.log(response.data)
                setAllInfo(response.data)
            } catch(err) {
                console.warn(err)
            }
        }
        getUser()
    })


    return(
        <div>
            <div>Hello, {props.currentUser.firstName}</div>
            <div id="divAroundForm" className="bg-yellow-400 p-12 rounded-md mt-12 flex flex-col text-white drop-shadow-2xl text-2xl w-2/3 mx-auto">
                <form>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">First Name:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="firstName" placeholder='First Name' onChange={e => setFirstName(e.target.value)} value={firstName} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Email:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="Email" placeholder='Email' onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                </form>
                
            </div>
        </div>
    )
}