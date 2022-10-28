import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function EditProfile(props) {
    // const [firstName, setFirstName] = useState(props.currentUser.firstName)
    // const [email, setEmail] = useState(`${props.currentUser.email}`)
    const decode = jwt_decode(localStorage.getItem('jwt'))
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [form, setForm] = useState({})
    const { userId } = useParams()
    const [photo, setPhoto] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    console.log("decode", decode)
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

    const uploadImage = async e => {
		const files = e.target.files[0];
		const formData = new FormData();
			formData.append('upload_preset', 'oiwq1rx8');
			formData.append('file', files);
			setLoading(true)
			try {
				const response = await axios.post(`https://api.cloudinary.com/v1_1/dspcnzoiy/image/upload`,formData)
				console.log(response.data)
				setForm({...form, photo: response.data.url})
				// console.log(photos)
			}catch(err){
				console.warn(err)
			}
	}

    
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/edit`, form)
            const { token } = response.data
            localStorage.setItem("jwt", token)
            const decode = jwt_decode(token)
            props.setCurrentUser(decode)
            navigate(`/profile`)
        } catch(err) {
            console.warn(err)
        }
    }

    const birthYearOptions = [] 
	
		for (var i = 2004; i >= 1922; i--) {
			birthYearOptions.push(<option value={i}>{i}</option>)
		}


    return(
        <div>
            <div id="divAroundForm" className="bg-yellow-300 p-12 rounded-md mt-12 flex flex-col text-white drop-shadow-2xl text-2xl w-2/3 mx-auto">
                <div className='mb-2 text-3xl'>Hello, {props.currentUser.firstName}</div>
                <form onSubmit = {handleSubmit}>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">First Name:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="firstName" placeholder="First Name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}  />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Last Name:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="firstName" placeholder='First Name' onChange={e => setForm({...form, lastName: e.target.value})} value={form.lastName} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Birth Month:</label>
                        <select required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="birthMonth"  onChange={e => setForm({...form, birthMonth: e.target.value})} value={form.birthMonth}>
                            <option value="1">January</option>
							<option value="2">February</option>
							<option value="3">March</option>
							<option value="4">April</option>
							<option value="5">May</option>
							<option value="6">June</option>
							<option value="7">July</option>
							<option value="8">August</option>
							<option value="9">September</option>
							<option value="10">October</option>
							<option value="11">November</option>
							<option value="12">December</option>
                        </select>
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Birth Day:</label>
                        <select required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="birthDay"  onChange={e => setForm({...form, birthDay: e.target.value})} value={form.birthDay}>
                            <option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
							<option value="25">25</option>
							<option value="26">26</option>
							<option value="27">27</option>
							<option value="28">28</option>
							<option value="29">29</option>
							<option value="30">30</option>
							<option value="31">31</option>
                        </select>
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Birth Year:</label>
                        <select required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="birthYear"  onChange={e => setForm({...form, birthYear: e.target.value})} value={form.birthYear}>
                            {birthYearOptions}
                        </select>
                    </div>
                    
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Email:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="email" placeholder='Email' onChange={e => setForm({...form, email: e.target.value})} value={form.email} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Gender:</label>
                        <select required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="gender" placeholder='Gender' onChange={e => setForm({...form, gender: e.target.value})} value={form.gender}>
                            <option value="Man">Man</option>
                            <option value="Woman">Woman</option>
                            <option value="More">More</option>
                        </select>
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">I'm Looking For:</label>
                        <select required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="lookingFor" onChange={e => setForm({...form, lookingFor: e.target.value})} value={form.lookingFor}>
                            <option value="Man">Man</option>
                            <option value="Woman">Woman</option>
                            <option value="Friends">Friends</option>
                            <option value="No Preference"></option>

                        </select>
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">City:</label>
                        <input required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="city" placeholder='City' onChange={e => setForm({...form, city: e.target.value})} value={form.city} />
                    </div>
                    <div className='font-bold w-1/3  flex flex-row justify-start'>
                        <label className="mb-2">Favorite Programming Language:</label>
                        <select required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="favoritePLanugage" placeholder='Favorite Programming Language' onChange={e => setForm({...form, favoritePLanguage: e.target.value})} value={form.favoritePLanguage}>
                            <option value="Python">Python</option>
							<option value="JavaScript">Javascript</option>
							<option value="Java">Java</option>
							<option value="C#">C#</option>
							<option value="C">C</option>
							<option value="C++">C++</option>
							<option value="GO">GO</option>
							<option value="R">R</option>
							<option value="Swift">Swift</option>
							<option value="PHP">PHP</option>
							<option value="HTML">HTML</option>
							<option value="Kotlin">Kotlin</option>
							<option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='font-bold  flex flex-row justify-start'>
                        <label className="mb-2">Biography:</label>
                        <textarea required className='h-1/3 mb-2 text-3xl  bg-white ml-2' type="text" id="biography" placeholder='Biography' onChange={e => setForm({...form, biography: e.target.value})} value={form.biography}></textarea>
                    </div>

                    <div class="w-full lg:w-12/12 px-4">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="profileimage">
                            Change your profile picture
                        </label>
                        <input type="file" name='file' id="profileimage" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-4/12 ease-linear transition-all duration-150" onChange={uploadImage}/>
                        </div>
				    </div>
                    <button type="submit" class="ml-2 p-3 bg-blue-600 rounded-md">Update!</button>
                    

                </form>
                
            </div>
        </div>
    )
}