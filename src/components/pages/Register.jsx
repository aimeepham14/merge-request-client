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
		// <div>
		// 	<h1>Register for an account:</h1>

		// 	<p>{msg}</p>

		// 	<form onSubmit={handleSubmit}>
		// 		<label htmlFor='firstName'>First Name:</label>
		// 		<input 
		// 			type="text"
		// 			id="firstName"
		// 			placeholder='Dwight'
		// 			onChange={e => setFirstName(e.target.value)}
		// 			value={firstName}
		// 		/>
		// 		<label htmlFor='lastName'>Last Name:</label>
		// 		<input 
		// 			type="text"
		// 			id="lastName"
		// 			placeholder='Schrute'
		// 			onChange={e => setLastName(e.target.value)}
		// 			value={lastName}
		// 		/>
		// 		<label for="birthMonth">Birth Month</label>
		// 		<select id="birthMonth" name="month" 
		// 		onChange={e => setBirthMonth(e.target.value)}
		// 			value={birthMonth} required>
		// 			<option value="1">January</option>
		// 			<option value="2">February</option>
		// 			<option value="3">March</option>
		// 			<option value="4">April</option>
		// 			<option value="5">May</option>
		// 			<option value="6">June</option>
		// 			<option value="7">July</option>
		// 			<option value="8">August</option>
		// 			<option value="9">September</option>
		// 			<option value="10">October</option>
		// 			<option value="11">November</option>
		// 			<option value="12">December</option>
		// 		</select>

		// 		<label for="birthDay">Birth Day</label>
		// 		<select id="birthDay" name="day" onChange={e => setBirthDay(e.target.value)}
		// 			value={birthDay} required>
		// 			<option value="1">1</option>
		// 			<option value="2">2</option>
		// 			<option value="3">3</option>
		// 			<option value="4">4</option>
		// 			<option value="5">5</option>
		// 			<option value="6">6</option>
		// 			<option value="7">7</option>
		// 			<option value="8">8</option>
		// 			<option value="9">9</option>
		// 			<option value="10">10</option>
		// 			<option value="11">11</option>
		// 			<option value="12">12</option>
		// 			<option value="13">13</option>
		// 			<option value="14">14</option>
		// 			<option value="15">15</option>
		// 			<option value="16">16</option>
		// 			<option value="17">17</option>
		// 			<option value="18">18</option>
		// 			<option value="19">19</option>
		// 			<option value="20">20</option>
		// 			<option value="21">21</option>
		// 			<option value="22">22</option>
		// 			<option value="23">23</option>
		// 			<option value="24">24</option>
		// 			<option value="25">25</option>
		// 			<option value="26">26</option>
		// 			<option value="27">27</option>
		// 			<option value="28">28</option>
		// 			<option value="29">29</option>
		// 			<option value="30">30</option>
		// 			<option value="31">31</option>
		// 		</select>

		// 		<label for="birthYear">Birth Year</label>
		// 		<select id="birthYear" name="year" onChange={e => setBirthYear(e.target.value)}
		// 			value={birthYear} required>
		// 				{birthYearOptions}
		// 		</select>

		// 		<p>Gender:</p>
		// 		<label htmlFor='gender'>Man</label>
		// 		<input 
		// 			type="radio"
		// 			id="Gender"
		// 			name="Gender"
		// 			placeholder='Man'
		// 			onChange={e => setGender(e.target.value)}
		// 			value='Man'
		// 		/>
		// 		<label htmlFor='Gender'>Woman</label>
		// 		<input 
		// 			type="radio"
		// 			id="Gender"
		// 			name="Gender"
		// 			placeholder='Woman'
		// 			onChange={e => setGender(e.target.value)}
		// 			value='Woman'
		// 		/>
		// 		<label htmlFor='Gender'>More</label>
		// 		<input 
		// 			type="radio"
		// 			id="Gender"
		// 			name="Gender"
		// 			placeholder='More'
		// 			onChange={e => setGender(e.target.value)}
		// 			value='More'
		// 		/>

		// 		<label htmlFor='password'>Password:</label>
		// 		<input 
		// 			type="password"
		// 			id="password"
		// 			placeholder='password...'
		// 			onChange={e => setPassword(e.target.value)}
		// 			value={password}
		// 		/>

		// 		<label htmlFor='email'>Email:</label>
		// 		<input 
		// 			type="email"
		// 			id="email"
		// 			placeholder='your email...'
		// 			onChange={e => setEmail(e.target.value)}
		// 			value={email}
		// 		/>

		// 		<label htmlFor='city'>City:</label>
		// 		<input 
		// 			type="text"
		// 			id="city"
		// 			placeholder='City...'
		// 			onChange={e => setCity(e.target.value)}
		// 			value={city}
		// 		/>
		// 		<label htmlFor='biography'>Biography:</label>
		// 		<input 
		// 			type="text"
		// 			id="biography"
		// 			name="biography"
		// 			placeholder='I am the assistant to the manager...'
		// 			onChange={e => setBiography(e.target.value)}
		// 			value={biography}
		// 		/>
		// 		<label for="favoriteLanguage">Favorite Programming Language:</label>
		// 		<select id="favoriteLanguage" name="favoritePLanguage" 
		// 		onChange={e => setFavoritePLanguage(e.target.value)}
		// 			value={favoritePLanguage} required>
		// 			<option value="Python">Python</option>
		// 			<option value="JavaScript">Javascript</option>
		// 			<option value="Java">Java</option>
		// 			<option value="C#">C#</option>
		// 			<option value="C">C</option>
		// 			<option value="C++">C++</option>
		// 			<option value="GO">GO</option>
		// 			<option value="R">R</option>
		// 			<option value="Swift">Swift</option>
		// 			<option value="PHP">PHP</option>
		// 			<option value="HTML">HTML</option>
		// 			<option value="Kotlin">Kotlin</option>
		// 			<option value="Other">Other</option>
		// 		</select>

				
		// 		<p>Looking For:</p>
		// 		<label htmlFor='lookingFor'>Man</label>
		// 		<input 
		// 			type="radio"
		// 			id="lookingFor"
		// 			name="lookingFor"
		// 			placeholder='Man'
		// 			onChange={e => setLookingFor(e.target.value)}
		// 			value='Man'
		// 		/>
		// 		<label htmlFor='lookingFor'>Woman</label>
		// 		<input 
		// 			type="radio"
		// 			id="lookingFor"
		// 			name="lookingFor"
		// 			placeholder='Woman'
		// 			onChange={e => setLookingFor(e.target.value)}
		// 			value='Woman'
		// 		/>
		// 		<label htmlFor='lookingFor'>Friends</label>
		// 		<input 
		// 			type="radio"
		// 			id="lookingFor"
		// 			name="lookingFor"
		// 			placeholder='Friends'
		// 			onChange={e => setLookingFor(e.target.value)}
		// 			value='Friends'
		// 		/>
		// 		<label htmlFor='lookingFor'>No Preference</label>
		// 		<input 
		// 			type="radio"
		// 			id="lookingFor"
		// 			name="lookingFor"
		// 			placeholder='No Preference'
		// 			onChange={e => setLookingFor(e.target.value)}
		// 			value='No Preference'
		// 		/>
				

		// 		<button type="submit">Register</button>
		// 	</form>

		// 	<div>
		// 		<h1></h1>
		// 		<form></form>
		// 		<label htmlFor='profileimage'>Upload a profile picture:</label>
		// 		<input type='file' name='file'id='profileimage' onChange={uploadImage}></input>
		// 		<h1>Account Preview</h1>
		// 		{ loading ? <img src={photo} style={{height: 250}}></img>: <img src='https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg'></img> }
		// 		<p>Biography:</p>
		// 		<p>{biography}</p>
		// 	</div>
		// </div>



		<section className=" py-1 bg-blueGray-50">
		<div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
		<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
			<div className="rounded-t bg-white mb-0 px-6 py-6">
			<div className="text-center flex justify-between">
				<h6 className="text-blueGray-700 text-3xl font-bold text-code">
				Sign up to send a merge request...
				</h6>
			</div>
			</div>
			<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
			<form onSubmit={handleSubmit}>
				<h6 className="text-blueGray-400 text-2xl mt-3 mb-6 font-bold uppercase text-code">
				User Information
				</h6>
				<div className="flex flex-wrap">
				<div className="w-full lg:w-6/12 px-4">
					<div className="relative w-full mb-3">
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={email} id="email" onChange={e => setEmail(e.target.value)} />
					</div>
				</div>
				<div className="w-full lg:w-6/12 px-4">
					<div className="relative w-full mb-3">
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
						Password
					</label>
					<input type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={password} id="password" onChange={e => setPassword(e.target.value)} />
					</div>
				</div>

				<div className="w-full lg:w-4/12 px-4">
					<div className="relative w-full mb-3">
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="firstName">
						First Name
					</label>
					<input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={firstName} id="firstName" onChange={e => setFirstName(e.target.value)} />
					</div>
				</div>
				<div className="w-full lg:w-4/12 px-4">
					<div className="relative w-full mb-3">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="lastName">
						Last Name
					</label>
					<input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={lastName} id="lastName" onChange={e => setLastName(e.target.value)} />
					</div>
				</div>
				<div className="w-full lg:w-4/12 px-4">
					<div className="relative w-full mb-3">
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="city">
						City
					</label>
					<input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={city} id="city" onChange={e => setCity(e.target.value)} />
					</div>
				</div>


				<div className="w-full lg:w-4/12 px-4">
					<div className="relative w-full mb-3">
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="birthMonth">
						Birth Month
					</label>
					<select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={birthMonth} required id="birthMonth" name="month" onChange={e => setBirthMonth(e.target.value)}>
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
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="birthDay">
						Birth Day
					</label>
					<select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={birthDay} required id="birthDay" onChange={e => setBirthDay(e.target.value)}>
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
				</div>

				<div className="w-full lg:w-4/12 px-4">
					<div className="relative w-full mb-3">
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="birthYear">
						Birth Year
					</label>
					<select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={birthYear} required id="birthYear" onChange={e => setBirthYear(e.target.value)}>
						{birthYearOptions}
					</select>
					</div>
				</div>


				</div>

				<hr className="mt-6 border-b-1 border-blueGray-300"/>

				<h6 className="text-blueGray-400 text-2xl text-code mt-3 mb-6 font-bold uppercase">
				Preferences
				</h6>
				<div className="flex flex-wrap">

				<div className="w-full lg:w-12/12 px-4">
					<div className="relative w-full mb-3">
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Gender">
						Gender
					</label>
						<div className="block pt-3 pb-2 space-x-4">
							<label htmlFor='gender'>
								<input
								type="radio"
								id="genderMan"
								name="Gender"
								onChange={e => setGender(e.target.value)}
								value="Man"
								className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
								/>
								Man
							</label>
							<label htmlFor='gender'>
								<input
								type="radio"
								id="genderWomen"
								name="Gender"
								onChange={e => setGender(e.target.value)}
								value="Woman"
								className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
								/>
								Woman
							</label>
							<label htmlFor='gender'>
								<input
								type="radio"
								id="genderMore"
								name="Gender"
								onChange={e => setGender(e.target.value)}
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
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="lookingFor">
						I'm Looking For
					</label>
						<div className="block pt-3 pb-2 space-x-4">
							<label htmlFor='lookingFor'>
								<input
								type="radio"
								id="lookingForMan"
								name="lookingFor"
								onChange={e => setLookingFor(e.target.value)}
								value="Man"
								className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
								/>
								Man
							</label>
							<label htmlFor='lookingFor'>
								<input
								type="radio"
								id="lookingForWomen"
								name="lookingFor"
								onChange={e => setLookingFor(e.target.value)}
								value="Woman"
								className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
								/>
								Women
							</label>
							<label htmlFor='lookingFor'>
								<input
								type="radio"
								id="lookingForFriends"
								name="lookingFor"
								onChange={e => setLookingFor(e.target.value)}
								value="Friends"
								className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
								/>
								Friends
							</label>
							<label htmlFor='lookingFor'>
								<input
								type="radio"
								id="lookingForNoPreference"
								name="lookingFor"
								onChange={e => setLookingFor(e.target.value)}
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
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="favoriteLanguage">
						Favorite Programming Language
					</label>
					<select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-3/12 ease-linear transition-all duration-150" value={favoritePLanguage} required id="favoriteLanguage" name="favoriteLanguage" onChange={e => setFavoritePLanguage(e.target.value)}>
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

				<h6 className="text-blueGray-400 text-2xl text-code mt-3 mb-6 font-bold uppercase">
				About Me
				</h6>


				<div className="flex flex-wrap">
				<div className="w-full lg:w-12/12 px-4">
					<div className="relative w-full mb-3">
					<textarea type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4"> Enter a bio and a pick up line here.</textarea>
					</div>
				</div>
				</div>


				<div className="w-full lg:w-12/12 px-4">
					<div className="relative w-full mb-3">
					<label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="profileimage">
						Upload a profile picture
					</label>
					<input type="file" name='file' id="profileimage" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-4/12 ease-linear transition-all duration-150" onChange={uploadImage}/>
					</div>
				</div>

				<button
				id="button"
				type="submit"
				className="w-2/12 px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
				>
				Sign-Up
			</button>

				<hr className="mt-6 border-b-1 border-blueGray-300"/>

				<h6 className="text-blueGray-400 text-2xl text-code mt-3 mb-6 font-bold uppercase">
				Profile Preview
				</h6>

				<div className="w-full lg:w-4/12 px-4">
					<div className="relative w-full mt-3 mb-6">
					{ loading ? <img src={photo} style={{height: 250}}></img>: <img src={photo}></img> }
					<p>{biography}</p>
					</div>
				</div>

				
			</form>
			</div>
		</div>
		</div>
		</section>


	)
}




