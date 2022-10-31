import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody)

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

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		
	<div class="mx-auto max-w-screen h-screen px-4 py-16 sm:px-6 lg:px-8 bg-[#1C1C1C] ">
	<div class="mx-auto max-w-lg">
		<h1 class="text-center text-5xl font-code text-primary">
		You had me at
		</h1>
		<h1 class="text-center text-5xl font-code text-secondary">
		Hello World.
		</h1>

		<form action="" class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-slate-50  shadow-2xl" onSubmit={handleSubmit}>
		<p class="text-3xl font-code text-yellow">Sign in to your account</p>

		<div>
			<label for="email" class="text-sm font-code text-primary text-2xl">Email</label>

			<div class="relative mt-1">
			<input
				type="email"
				id="email"
				class="w-full rounded-lg border-white p-4 pr-12 text-sm shadow-sm"
				placeholder="Enter email"
				onChange={e => setEmail(e.target.value)}
				value={email}
				/>
			</div>
		</div>

		<div>
			<label for="password" class="text-sm font-code text-primary text-2xl">Password</label>

			<div class="relative mt-1">
			<input
				type="password"
				id="password"
				class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
				placeholder="Enter password"
				onChange={e => setPassword(e.target.value)}
				value={password}
			/>

			</div>
		</div>

		<button
			type="submit"
			class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-2xl text-yellow font-code"
			>
			SIGN IN
		</button>

		<div className="text-red text-2xl mt-3 mb-6 font-code uppercase"> 
			{msg}
		</div>

		<p class="text-center font-code text-primary">
			No account? 
			<Link to="/register" class="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code mr-10 underline">
				Sign-Up
			</Link> 
		</p>
		</form>
	</div>
	</div>
	)
}