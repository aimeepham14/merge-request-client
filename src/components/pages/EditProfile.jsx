import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import Modal from '../Modal'

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
    const [showModal, setShowModal] = useState(false)
    const [biography, setBiography] = useState('');
    const navigate = useNavigate()
    const [autocompleteCities, setAutocompleteCities] = useState([]);
	const [autocompleteStates, setAutocompleteStates] = useState([]);
  	const [autocompleteErr, setAutocompleteErr] = useState("");

      const states = [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
	  'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
	  'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM',
	  'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
	  'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']

    // fetches the autocomplete api
    const fetchPlace = async (text) => {
		try {
		  const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_MAP_API_KEY}&autocomplete=true`);
		  if (!res.ok) throw new Error(res.statusText);
		  return await res.json();
		} catch (err) {
		  return { error: "Unable to retrieve places" };
		}
	  };
    // sets the city autocomplete
	const handleCityChange = async (e) => {
        setForm({...form, city: e.target.value})
		const res = await fetchPlace(form.city);
		!autocompleteCities.includes(e.target.value) &&
		  res.features &&
		  setAutocompleteCities(res.features.map((place) => place.text));
		res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
	  };
      // sets the state autocomplete
	  const handleStateChange = async (e) => {
        // console.log(form.state)

        setForm({...form, state: e.target.value})
		!autocompleteStates.includes(e.target.value) &&
		  setAutocompleteStates(states);
          console.log(autocompleteStates)
	  };


    // gets user data
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}`)
                setForm(response.data)
            } catch(err) {
                console.warn(err)
            }
        }
        getUser()
    }, [userId])

    useEffect(()=> {
        setForm({...form, location: `${form.city},${form.state}`})
    },[form.city])
    useEffect(()=> {
        setForm({...form, location: `${form.city},${form.state}`})
    },[form.state])

    // uploads image to cloudinary
    const uploadImage = async e => {
		const files = e.target.files[0];
		const formData = new FormData();
			formData.append('upload_preset', 'oiwq1rx8');
			formData.append('file', files);
			setLoading(true)
			try {
				const response = await axios.post(`https://api.cloudinary.com/v1_1/dspcnzoiy/image/upload`,formData)
				setForm({...form, photo: response.data.url})
			}catch(err){
				console.warn(err)
			}
	}
    
    // submits form with updated data
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

    // shows modal for deleting profile
    const handleModal = async (e) => {
        e.preventDefault()
        try {
            setShowModal(true)
        } catch (err) {
            console.warn(err)
        }
    }

    // birth year options
    const birthYearOptions = [] 
		for (var i = 2004; i >= 1922; i--) {
			birthYearOptions.push(<option value={i}>{i}</option>)
		}

    // handles delete of account
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('jwt')
            const decoded = jwt_decode(token)
            let userId = decoded.id
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/edit`, {data: {userId, id}})
            const thisUser ={...props.currentUser}
            props.setCurrentUser(thisUser)
            props.handleLogout()
            navigate(`/`)
        } catch (err) {
            console.warn(err)
        }
    }

    return(
    <section className=" py-1 bg-[#1C1C1C]">
    <div className="w-full lg:w-8/12 px-4 mx-auto mt-6 bg-[#1C1C1C]">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#1C1C1C] shadow-slate-50  shadow-2xl border-0">
        <div className="rounded-t bg-[#1C1C1C] mb-0 px-6 py-6 ">
        <div className="text-center flex justify-between">
            <h6 className="text-secondary text-4xl font-code">
            Fix your bug below {props.currentUser.firstName}
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
                <label className="block uppercase text-m font-code text-db mb-2" htmlFor="firstName">
                    First Name
                </label>
                <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={form.firstName} id="firstName" onChange={e => setForm({...form, firstName: e.target.value})} />
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" htmlFor="lastName">
                    Last Name
                </label>
                <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={form.lastName} id="lastName" onChange={e => setForm({...form, lastName: e.target.value})}/>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" htmlFor="city">
                    City
                </label>
                <input list='cities' type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={form.city} id="city" onChange={handleCityChange} pattern={autocompleteCities.join("|")} autoComplete="on" required/>
				<datalist id="cities">
				{autocompleteCities.map((city, i) => (
				<option key={i}>{city}</option>
				))}
					</datalist>
					</div>
				</div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" htmlFor="state">
                    State
                </label>
                <input list='states' type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={form.state} id="state" onChange={handleStateChange} pattern={autocompleteStates.join("|")} autoComplete="on" required/>
				<datalist id="states">
				{autocompleteStates.map((state, i) => (
				<option key={i}>{state}</option>
				))}
					</datalist>
					</div>
				</div>

            <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" for="birthMonth">
                    Birth Month
                </label>
                <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-code" value={form.birthMonth} required id="birthMonth" name="month" onChange={e => setForm({...form, birthMonth: e.target.value})} >
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
            </div>

            <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" for="birthDay">
                    Birth Day
                </label>  
                {/* makes it so that birth dates cannot be dates that do not exist */}
                        {form.birthMonth == 2 && form.birthYear % 4 == 0
                        ? 
                        <div>
                        <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-code" value={form.birthDay} required id="birthDay" onChange={e => setForm({...form, birthDay: e.target.value})}>
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
                        </select>
                        </div>
                        : 
                        form.birthMonth == 2 && form.birthYear % 4 != 0
                        ? 
                        <div>
                        <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-code" value={form.birthDay} required id="birthDay" onChange={e => setForm({...form, birthDay: e.target.value})}>
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
        
                        </select>
                        </div>
                        :
                        form.birthMonth == 4 || form.birthMonth == 6 || form.birthMonth == 9 || form.birthMonth == 11
                        ? 
                        <div>
                        <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-code" value={form.birthDay} required id="birthDay" onChange={e => setForm({...form, birthDay: e.target.value})}>
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
                        </select>
                        </div>
                        :
                        <div>
                        <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-code" value={form.birthDay} required id="birthDay" onChange={e => setForm({...form, birthDay: e.target.value})}>
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
                        }  
                </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                <label class="block uppercase text-m font-code text-db mb-2" for="birthYear">
                    Birth Year
                </label>
                <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-code" value={form.birthYear} required id="birthYear" onChange={e => setForm({...form, birthYear: e.target.value})} >
                    {birthYearOptions}
                </select>
                </div>
            </div>

            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300"/>

            <h6 className="text-primary text-2xl text-code mt-3 mb-6 font-code uppercase">
            Preferences
            </h6>
            <div className="flex flex-wrap">

            <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" for="Gender">
                    Gender
                </label>
                    <div className="block pt-3 pb-2 space-x-4">
                        <label htmlFor='gender' className='font-code2 text-yellow'>
                            <input
                            type="radio"
                            id="manGender"
                            name="Gender"
                            onChange={e => setForm({...form, gender: e.target.value})}
                            value="Man"
                            className="mr-2 text-blac border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            />
                            Man
                        </label>
                        <label htmlFor='gender' className='font-code2 text-yellow'>
                            <input
                            type="radio"
                            id="womanGender"
                            name="Gender"
                            onChange={e => setForm({...form, gender: e.target.value})}
                            value="Woman"
                            className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            />
                            Woman
                        </label>
                        <label htmlFor='gender' className='font-code2 text-yellow'>
                            <input
                            type="radio"
                            id="moreGender"
                            name="Gender"
                            onChange={e => setForm({...form, gender: e.target.value})}
                            value="More"
                            className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            />
                            More
                        </label>
                    </div>
                </div>
            </div>


            <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" for="lookingFor">
                    I'm Looking For
                </label>
                    <div className="block pt-3 pb-2 space-x-4">
                        <label htmlFor='lookingFor' className='font-code2 text-yellow'>
                            <input
                            type="radio"
                            id="lookingFor"
                            name="lookingFor"
                            onChange={e => setForm({...form, lookingFor: e.target.value})}
                            value="Man"
                            className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            />
                            Man
                        </label>
                        <label htmlFor='lookingFor' className='font-code2 text-yellow'>
                            <input
                            type="radio"
                            id="lookingFor"
                            name="lookingFor"
                            onChange={e => setForm({...form, lookingFor: e.target.value})}
                            value="Woman"
                            className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            />
                            Woman
                        </label>
                        <label htmlFor='lookingFor' className='font-code2 text-yellow'>
                            <input
                            type="radio"
                            id="lookingFor"
                            name="lookingFor"
                            onChange={e => setForm({...form, lookingFor: e.target.value})}
                            value="Friends"
                            className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            />
                            Friends
                        </label>
                        <label htmlFor='lookingFor' className='font-code2 text-yellow'>
                            <input
                            type="radio"
                            id="lookingFor"
                            name="lookingFor"
                            onChange={e => setForm({...form, lookingFor: e.target.value})}
                            value="No Preference"
                            className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            />
                            No Preference
                        </label>
                    </div>
                </div>
            </div>

            

            <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" for="favoriteLanguage">
                    Favorite Programming Language
                </label>
                <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-orange font-code bg-white rounded text-sm shadow focus:outline-none focus:ring w-3/12 ease-linear transition-all duration-150" value={form.favoritePLanguage} required id="favoriteLanguage" name="favoriteLanguage" onChange={e => setForm({...form, favoritePLanguage: e.target.value})}>
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
            </div>

        
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300"/>

            <h6 className="text-primary text-2xl mt-3 mb-6 font-code uppercase">
            About Me
            </h6>


            <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                <textarea type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-orange bg-white font-code rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4" onChange={e => setForm({...form, biography: e.target.value})} value={form.biography} id="biography" > Enter a bio and a pick up line here.</textarea>
                </div>
            </div>
            </div>


            <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-m font-code text-db mb-2" htmlFor="profileimage">
                    Upload a profile picture
                </label>
                <input type="file" name='file' id="profileimage" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-4/12 ease-linear transition-all duration-150 font-code" onChange={uploadImage}/>
                </div>
            </div>

            <div>
            <button
            id="button"
            type="submit"
            className="w-52 px-6 py-3 mt-3 mr-2 mb-6 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow-300 hover:bg-yellow-500 hover:shadow-lg focus:outline-none"
            style={{color: 'rgb(255,255,255)'}}
            >
            Update Profile
            </button>
            <button  
            id="delete"
            className="w-52 px-6 py-3 mt-3 ml-2 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-[#F23D41] hover:bg-red-800 hover:shadow-lg focus:outline-none" style={{color: 'rgb(255,255,255)'}} onClick = {handleModal}
            >
            Delete Profile
            </button>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <p>Are you sure you would like to delete your profile?</p>
                    <button  
                        id="confirmDelete"
                        className="w-5/12 px-6 py-3 mt-3 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-600 hover:bg-yellow-500 hover:shadow-lg focus:outline-none" onClick = {() => handleDelete(`${props.currentUser._id}`)}
                    >
                        Yes, get me out of here!
                    </button>
                    <button  
                        id="nope"
                        className="w-5/12 px-6 py-3 mt-3 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-600 hover:bg-yellow-500 hover:shadow-lg focus:outline-none" onClick = {() => setShowModal(false)}
                    >
                        Oops, take me back!
                    </button>
                </div>
            </Modal>
            <div>
            <button className="hover:bg-grey text-white font-bold py-2 px-4 rounded inline-flex items-center" style={{color: 'rgb(255,255,255)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M13.024 9.25c.47 0 .827-.433.637-.863a4 4 0 00-4.094-2.364c-.468.05-.665.576-.43.984l1.08 1.868a.75.75 0 00.649.375h2.158zM7.84 7.758c-.236-.408-.79-.5-1.068-.12A3.982 3.982 0 006 10c0 .884.287 1.7.772 2.363.278.38.832.287 1.068-.12l1.078-1.868a.75.75 0 000-.75L7.839 7.758zM9.138 12.993c-.235.408-.039.934.43.984a4 4 0 004.094-2.364c.19-.43-.168-.863-.638-.863h-2.158a.75.75 0 00-.65.375l-1.078 1.868z" />
            <path fill-rule="evenodd" d="M14.13 4.347l.644-1.117a.75.75 0 00-1.299-.75l-.644 1.116a6.954 6.954 0 00-2.081-.556V1.75a.75.75 0 00-1.5 0v1.29a6.954 6.954 0 00-2.081.556L6.525 2.48a.75.75 0 10-1.3.75l.645 1.117A7.04 7.04 0 004.347 5.87L3.23 5.225a.75.75 0 10-.75 1.3l1.116.644A6.954 6.954 0 003.04 9.25H1.75a.75.75 0 000 1.5h1.29c.078.733.27 1.433.556 2.081l-1.116.645a.75.75 0 10.75 1.298l1.117-.644a7.04 7.04 0 001.523 1.523l-.645 1.117a.75.75 0 101.3.75l.644-1.116a6.954 6.954 0 002.081.556v1.29a.75.75 0 001.5 0v-1.29a6.954 6.954 0 002.081-.556l.645 1.116a.75.75 0 001.299-.75l-.645-1.117a7.042 7.042 0 001.523-1.523l1.117.644a.75.75 0 00.75-1.298l-1.116-.645a6.954 6.954 0 00.556-2.081h1.29a.75.75 0 000-1.5h-1.29a6.954 6.954 0 00-.556-2.081l1.116-.644a.75.75 0 00-.75-1.3l-1.117.645a7.04 7.04 0 00-1.524-1.523zM10 4.5a5.475 5.475 0 00-2.781.754A5.527 5.527 0 005.22 7.277 5.475 5.475 0 004.5 10a5.475 5.475 0 00.752 2.777 5.527 5.527 0 002.028 2.004c.802.458 1.73.719 2.72.719a5.474 5.474 0 002.78-.753 5.527 5.527 0 002.001-2.027c.458-.802.719-1.73.719-2.72a5.475 5.475 0 00-.753-2.78 5.528 5.528 0 00-2.028-2.002A5.475 5.475 0 0010 4.5z" clip-rule="evenodd" />
            </svg>
                <Link to={`/profile/${userId}/secure`}>Secure Settings</Link>
            </button>
            </div>
            </div>
            
            <hr className="mt-6 border-b-1 border-blueGray-300"/>

            <h6 className="text-primary text-2xl text-2xl font-code mt-3 mb-6 font-bold uppercase">
            Profile Preview
            </h6>

            <div className="flex-auto ">
				<div className=" mb-3 sm:w-6/12 hero container mx-auto pb-10">
					{ loading ? <img src={form.photo} alt="pic preview"></img>: <img className="scale-125 " src={form.photo} alt="pic preview"></img> }
					<p className="font-code2 text-yellow mt-10 text-2xl">{biography}</p>
				</div>
			</div>
        </form>
        </div>
    </div>
    </div>
    </section>
    

    )
}





