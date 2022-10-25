import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	
	 const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
				<span onClick={handleLogout}>logout</span>
			</Link>

			<Link to="/profile" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
				profile
			</Link>
		</>
	 )

	 const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
				register
			</Link>

			<Link to="/login" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
				login
			</Link>
		</>
	 )

	return (
		<nav>
			{/* user always sees this section */}
			<Link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
				<p>User App</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}

