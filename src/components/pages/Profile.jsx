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
					// // get the token from local storage
					// const token = localStorage.getItem('jwt')
					// // make the auth headers
					// const options = {
					// 	headers: {
					// 		'Authorization': token
					// 	}
					// }
					// hit the auth locked endpoint
					const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`)
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

	<div className="min-h-screen bg-gray-700 flex justify-center items-center">
		<div className="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
			{/* <div>
				<h1 class="mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 text-4xl font-code2 text-db">{currentUser.firstName}, {currentUser.age} </h1>
			</div> */}
			<img className="w-min cursor-pointer" src={currentUser.photo}  alt="user profile pic" />
			<div className="flex p-4 justify-between">
				<div className="items-center space-x-2">
				<h1 className="text-gray-800 cursor-pointer text-4xl mb-1  text-left font-code text-secondary font-bold "> {currentUser.firstName}, {currentUser.age} </h1>
				<h2 className="text-gray-800 cursor-pointer text-2xl mb-2  text-left font-code text-aqua"> 
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
					</svg> 
					{currentUser.city}
				</h2>
				<h2 className="text-gray-800 cursor-pointer text-1xl mb-2 text-left font-code text-aqua mt-6">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
					</svg>
					 {currentUser.favoritePLanguage}
				</h2>
				<h2 className="text-gray-800 cursor-pointer text-1xl mb-2 text-left font-code text-aqua">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
					</svg>
					 {currentUser.biography}
				</h2>
				<h2 className="text-gray-800 cursor-pointer text-sm mb-2 text-left font-code text-[#718096] underline">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<Link to={`/profile/${currentUser.id}/edit`}>Edit Profile</Link>
				</h2>
				{/* <div className='mb-3 content-center'>
						<Link to={`/profile/${currentUser.id}/edit`}><button className="bg-orange-700 rounded-md p-2 font-bold ">Edit Profile</button></Link>
					</div> */}
				</div>
			</div>
		</div>
	</div>



	)
}










