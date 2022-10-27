import { Link, useParams } from 'react-router-dom'


export default function Navbar({ currentUser, handleLogout }) {
	const { userId } = useParams()
	
	 const loggedIn = () => {
		return(
		<>
			{/* if the user is logged in... */}
			<Link to={`/swipe/${currentUser.id}`} class="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">
				swipe
			</Link>
			<Link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-4">
				<span onClick={handleLogout}>logout</span>
			</Link>

			<Link to="/profile" class="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">
				profile
			</Link>

			<Link to="/requests" class="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">
				requests
			</Link>
		</>
		)
	 }

	 const loggedOut = () => {
		return(
		<>
			{/* if the user is not logged in... */}
			<Link to="/register" class="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">
				Sign-Up
			</Link>

			<Link to="/login" class="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">
				Login
			</Link>
		</>
	 	)
	 }

	return (
		<nav class="flex items-center justify-between flex-wrap bg-cyan-600 p-6">
			<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				<div class="text-sm lg:flex-grow">
					{/* user always sees this section */}
					<Link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">
						<p>Home</p>
					</Link>

					{currentUser ? loggedIn() : loggedOut()}
				</div>
			</div>
		</nav>
	)
}

