import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Profile({ currentUser, handleLogout}) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('')
	const [userDetails, setUserDetails] = useState({
		firstName: currentUser.firstName,
		biography: currentUser.biography,
		photo: currentUser.photo,
		favoritePLanguage: currentUser.favoritePLanguage
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
				<h1 class="mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 text-5xl font-code text-secondary">{currentUser.firstName}</h1>
			</div>
			<img class="w-full cursor-pointer" src={currentUser.photo}  alt="" />
			<div class="flex p-4 justify-between">
				<div class="flex items-center space-x-2">
					<h2 class="text-gray-800 cursor-pointer text-2xl mb-14 font-code text-secondary">Testing with a really really long biography. Blah blah adding a pick up message here{currentUser.biography}</h2>
				</div>
			{/* <div class="flex space-x-2">
				<div class="flex space-x-1 items-center">
				<span>
					<img src='https://i.imgur.com/A41MUu7.jpg?2' />
				</span>
				</div>
				<div class="flex space-x-1 items-center">
				<span>
					<img src="https://i.imgur.com/XnaQj9C.jpg?2"/>
				</span>
				</div>
			</div> */}
			</div>
		</div>
	</div>


	)
}


{/* <div class="min-h-screen bg-gray-700 flex justify-center items-center">
<div class="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
	<div>
		<h1 class="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">{currentUser.firstName}</h1>
	</div>
	<img class="w-full cursor-pointer" src={currentUser.photo}  alt="" />
	<div class="flex p-4 justify-between">
		<div class="flex items-center space-x-2">
			<h2 class="text-gray-800 font-bold cursor-pointer">Testing with a really really long biography. Blah blah adding a pick up message here{currentUser.biography}</h2>
		</div>
	<div class="flex space-x-2">
		<div class="flex space-x-1 items-center">
		<span>
			<img src='https://i.imgur.com/A41MUu7.jpg?2' />
		</span>
		</div>
		<div class="flex space-x-1 items-center">
		<span>
			<img src="https://i.imgur.com/XnaQj9C.jpg?2"/>
		</span>
		</div>
	</div>
	</div>
</div>
</div> */}




