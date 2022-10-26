import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react';

export default function Register({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthDay, setBirthDay] = useState('1');
	const [birthMonth, setBirthMonth] = useState('1');
	const [birthYear, setBirthYear] = useState('');
	const [gender, setGender] = useState('');
	const [city, setCity] = useState('');
	const [biography, setBiography] = useState('');
	const [lookingFor, setLookingFor] = useState('');
	const [msg, setMsg] = useState('');
	const [favoritePLanguage, setFavoritePLanguage] = useState('Python')
	//CLOUDINARY
	const [photo, setPhoto] = useState('');
	const [loading, setLoading] = useState(false);
	

	let newDate = new Date()
	let date = newDate.getDate()
	let month = newDate.getMonth() + 1

	useEffect(()=> {
		setBirthDay(date)
		setBirthMonth(month)
	},[])

	const uploadImage = async e => {
		const files = e.target.files[0];
		const formData = new FormData();
			formData.append('upload_preset', 'oiwq1rx8');
			formData.append('file', files);
			setLoading(true)
			try {
				const response = await axios.post(`https://api.cloudinary.com/v1_1/dspcnzoiy/image/upload`,formData)
				console.log(response.data)
				setPhoto(response.data.url)
				// console.log(photos)
			}catch(err){
				console.warn(err)
			}
	}

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				firstName,
				lastName,
				email, 
				password,
				birthDay,
				birthMonth,
				birthYear,
				gender,
				city,
				biography,
				lookingFor,
				photo,
				favoritePLanguage
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
 	}
	const birthYearOptions = [] 
	
		for (var i = 2004; i >= 1922; i--) {
			birthYearOptions.push(<option value={i}>{i}</option>)
		}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<div>
			<h1>Register for an account:</h1>

			<p>{msg}</p>

			<form onSubmit={handleSubmit}>
				<label htmlFor='firstName'>First Name:</label>
				<input 
					type="text"
					id="firstName"
					placeholder='Dwight'
					onChange={e => setFirstName(e.target.value)}
					value={firstName}
				/>
				<label htmlFor='lastName'>Last Name:</label>
				<input 
					type="text"
					id="lastName"
					placeholder='Schrute'
					onChange={e => setLastName(e.target.value)}
					value={lastName}
				/>
				<label for="birthMonth">Birth Month</label>
				<select id="birthMonth" name="month" 
				onChange={e => setBirthMonth(e.target.value)}
					value={birthMonth} required>
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

				<label for="birthDay">Birth Day</label>
				<select id="birthDay" name="day" onChange={e => setBirthDay(e.target.value)}
					value={birthDay} required>
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

				<label for="birthYear">Birth Year</label>
				<select id="birthYear" name="year" onChange={e => setBirthYear(e.target.value)}
					value={birthYear} required>
						{birthYearOptions}
				</select>

				<p>Gender:</p>
				<label htmlFor='gender'>Man</label>
				<input 
					type="radio"
					id="Gender"
					name="Gender"
					placeholder='Man'
					onChange={e => setGender(e.target.value)}
					value='Man'
				/>
				<label htmlFor='Gender'>Woman</label>
				<input 
					type="radio"
					id="Gender"
					name="Gender"
					placeholder='Woman'
					onChange={e => setGender(e.target.value)}
					value='Woman'
				/>
				<label htmlFor='Gender'>More</label>
				<input 
					type="radio"
					id="Gender"
					name="Gender"
					placeholder='More'
					onChange={e => setGender(e.target.value)}
					value='More'
				/>

				<label htmlFor='password'>Password:</label>
				<input 
					type="password"
					id="password"
					placeholder='password...'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>

				<label htmlFor='email'>Email:</label>
				<input 
					type="email"
					id="email"
					placeholder='your email...'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>

				<label htmlFor='city'>City:</label>
				<input 
					type="text"
					id="city"
					placeholder='City...'
					onChange={e => setCity(e.target.value)}
					value={city}
				/>
				<label htmlFor='biography'>Biography:</label>
				<input 
					type="text"
					id="biography"
					name="biography"
					placeholder='I am the assistant to the manager...'
					onChange={e => setBiography(e.target.value)}
					value={biography}
				/>
				<label for="favoriteLanguage">Favorite Programming Language:</label>
				<select id="favoriteLanguage" name="favoritePLanguage" 
				onChange={e => setFavoritePLanguage(e.target.value)}
					value={favoritePLanguage} required>
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
				<p>Looking For:</p>
				<label htmlFor='lookingFor'>Man</label>
				<input 
					type="radio"
					id="lookingFor"
					name="lookingFor"
					placeholder='Man'
					onChange={e => setLookingFor(e.target.value)}
					value='Man'
				/>
				<label htmlFor='lookingFor'>Woman</label>
				<input 
					type="radio"
					id="lookingFor"
					name="lookingFor"
					placeholder='Woman'
					onChange={e => setLookingFor(e.target.value)}
					value='Woman'
				/>
				<label htmlFor='lookingFor'>Friends</label>
				<input 
					type="radio"
					id="lookingFor"
					name="lookingFor"
					placeholder='Friends'
					onChange={e => setLookingFor(e.target.value)}
					value='Friends'
				/>
				<label htmlFor='lookingFor'>No Preference</label>
				<input 
					type="radio"
					id="lookingFor"
					name="lookingFor"
					placeholder='No Preference'
					onChange={e => setLookingFor(e.target.value)}
					value='No Preference'
				/>
				

				<button type="submit">Register</button>
			</form>

			<div>
				<h1></h1>
				<form></form>
				<label htmlFor='profileimage'>Upload a profile picture:</label>
				<input type='file' name='file'id='profileimage' onChange={uploadImage}></input>
				<h1>Account Preview</h1>
				{ loading ? <img src={photo} style={{height: 250}}></img>: <img src='https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg'></img> }
				<p>Biography:</p>
				<p>{biography}</p>
			</div>
		</div>
	)
}