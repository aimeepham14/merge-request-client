import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

export default function Profile({ currentUser, handleLogout}) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('')
	const [userDetails, setUserDetails] = useState({
		firstName: currentUser.firstName,
		biography: currentUser.biography,
		photo: currentUser.photo,
		favoritePLanguage: currentUser.favoritePLanguage,
		city: currentUser.city,
		lookingFor: currentUser.lookingFor
	})
	const { userId } = useParams()

	// useEffect for getting the user data and checking auth
	useEffect(() => {
		const fetchData = async () => {
				try {
					// get the token from local storage
					const token = localStorage.getItem('jwt')
					// make the auth headers
					const options = {
						headers: {
							'Authorization': token
						}
					}
					// hit the auth locked endpoint
					const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
					// example POST with auth headers (options are always last argument)
					// await axios.post(url, requestBody (form data), options)
					// set the secret user message in state
					setMsg(response.data.msg)
					console.log(currentUser)
				} catch (err) {
					// if the error is a 401 -- that means that auth failed
					console.warn(err)
					if (err.response) {
						if (err.response.status === 401) {
							// panic!
							handleLogout()
						}
					}
				}
			}
			fetchData()
	}, []) // only fire on the first render of this component


	return (

	<div class="min-h-screen bg-gray-700 flex justify-center items-center">
		<div class="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
			<div>
				<h1 class="mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 text-6xl font-code text-orange">{currentUser.firstName}</h1>
			</div>
			<img class="w-min cursor-pointer" src={currentUser.photo}  alt="user profile pic" />
			<div class="flex p-4 justify-between">
				<div class="items-center space-x-2">
					<h2 class="text-gray-800 cursor-pointer text-1xl mb-2  text-left font-code text-orange">{currentUser.city}</h2>
					<h2 class="text-gray-800 cursor-pointer text-2xl mb-2 text-left font-code text-secondary">{currentUser.biography}</h2>
					<h2 class="text-gray-800 cursor-pointer text-2xl mb-2 text-left font-code text-secondary">{currentUser.age} </h2>
					<div className='mx-auto'>
						<Link to={`/profile/${currentUser.id}/edit`}><button className="bg-orange-700 rounded-md p-2 font-bold">Edit Profile</button></Link>
					</div>
				</div>
			</div>
		</div>
	</div>


		// <div class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
		// <div class="rounded-lg shadow-xl bg-gray-900 text-white" style="width:450px;">
		// 	<div class="border-b border-gray-800 px-8 py-3">
		// 		<div class="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div><div class="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div><div class="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
		// 	</div>
		// 	<div class="px-8 py-6">
		// 		<p>
		// 			<em class="text-blue-400">const</em> 
		// 			<span class="text-green-400">aboutMe</span> 
		// 			<span class="text-pink-500">=</span> 
		// 			<em class="text-blue-400">function</em>
		// 			rbrace; </p>
				
		// 		<p>&nbsp;&nbsp;<span class="text-pink-500">return</span> rbrace; </p>
		// 		<p>&nbsp;&nbsp;&nbsp;&nbsp;name: <span class="text-yellow-300">'Scott Windon'</span>,</p>
		// 		<p>&nbsp;&nbsp;&nbsp;&nbsp;position: <span class="text-yellow-300">'fullstack-developer'</span>,</p>
		// 		<p>&nbsp;&nbsp;&nbsp;&nbsp;website: <span class="text-yellow-300">'<a href="https://scottwindon.com" target="_blank" class="text-yellow-300 hover:underline focus:border-none">https://scottwindon.com</a>'</span>,</p>
		// 		<p>rbrace; </p>
		// 		<p>rbrace;</p>
		// 	</div>
		// </div>
		// </div>




	)
}







