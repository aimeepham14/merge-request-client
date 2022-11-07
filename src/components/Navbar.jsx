import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'


export default function Navbar({ currentUser, handleLogout }) {
	const { userId } = useParams()
	const [active, setActive] = useState(false)

	const showMenu = () => {
        setActive(!active)
    }

	 const loggedIn = () => {
		return(
		<>
			{/* if the user is logged in... */}
			
			{/* <div className="lg:flex sm:hidden flex-grow items-center" id="example-navbar-warning">
						<Link to="/" className="text-3xl font-code leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-yellow">Merge Request</Link>
						<Link to="/aboutus" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">About <img src='/favicon.ico' style={{height: '25px'}}></img></Link>
				<ul className="flex flex-col lg:flex-row list-none ml-auto">
					<li className="nav-item">
						<Link to={`/swipe/${currentUser.id}`} className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Swipe</Link>
					</li>
					<li className="nav-item">
						<Link to="/requests" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Requests</Link>
					</li>
					<li className="nav-item">
					</li>
					<li className="nav-item">
					<Link to="/profile" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Profile</Link>
					</li>
					<li className="nav-item">
					<Link to="/" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75"><span onClick={handleLogout}>Logout</span></Link>
					</li>
				</ul>
			</div> */}


			<div className="bg-primary font-code w-full m-0">
				<div className=" mx-auto px-4">
				<div className="flex items-center justify-between ">
					<div>
						<Link to="/" className="px-3 py-2 flex items-center uppercase font-code text-3xl mr-10 leading-snug text-yellow hover:opacity-75">Merge Request<img src='/favicon.ico' style={{height: '30px'}}></img></Link>
					</div>

					<div className="hidden sm:flex sm:items-center">
						<Link to={`/swipe/${currentUser.id}`} className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Swipe</Link>
						<Link to="/requests" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Requests</Link>
						<Link to="/aboutus" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">About Us</Link>
					
					</div>

					<div className="hidden sm:flex sm:items-center">
						<Link to="/profile" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Profile</Link>
						<Link to="/" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75"><span onClick={handleLogout}>Logout</span></Link>
					</div>

				</div> 
				
				<div className="block sm:hidden border-t-2 py-2">
					<div className="flex flex-col">
						<Link to={`/swipe/${currentUser.id}`} className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Swipe</Link>
						<Link to="/requests" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Requests</Link>
						<Link to="/aboutus" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">About Us</Link>
					
					<div className="items-center border-t-2 pt-2">
						<Link to="/profile" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Profile</Link>
						<Link to="/" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75"><span onClick={handleLogout}>Logout</span></Link>
						
					</div>
					</div>
				</div>
				</div>
			</div>

		</>
		)
	 }

	 const loggedOut = () => {
		return(
		<>
		
			{/* if the user is not logged in... */}
			{/* <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
			<div className='hidden sm:flex sm:items-center'>
			<ul className="flex lg:flex-row ">
			<li className="nav-item">
				<Link to="/" className="px-3 py-2 flex items-center uppercase font-code text-2xl mr-10 leading-snug text-yellow hover:opacity-75">Merge Request</Link>
			</li>
				<Link to="/register" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Sign-Up</Link>
			<li className="nav-item">
				<Link to="/login" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Login</Link>
			</li>
			<li className="nav-item">
			<Link to="/aboutus" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">About <img src='/favicon.ico' style={{height: '25px'}}></img></Link>
			</li>
			</ul>
			</div>
			</div>
			<div class="block sm:hidden border-t-2 py-2">
				<div class="flex flex-col">
				
				
				<Link to="/register" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Sign-Up</Link>
				<Link to="/aboutus" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">About </Link>

				<div class="flex justify-between items-center border-t-2 pt-2">
					<Link to="/login" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Login</Link>
				</div>
				</div>
			</div> */}


			<div className="bg-primary font-code w-full m-0">
				<div className=" mx-auto px-4">
				<div className="flex items-center justify-between ">
					<div>
						<Link to="/" className="px-3 py-2 flex items-center uppercase font-code text-3xl mr-10 leading-snug text-yellow hover:opacity-75">Merge Request<img src='/favicon.ico' style={{height: '30px'}}></img></Link>
					</div>

					<div className="hidden sm:flex sm:items-center">
						<Link to="/register" className="px-3 py-2 flex items-center uppercase font-code text-3xl leading-snug text-yellow hover:opacity-75">Sign-Up</Link>
						<Link to="/aboutus" className="px-3 py-2 flex items-center uppercase font-code text-3xl leading-snug text-yellow hover:opacity-75">About Us</Link>
					
					</div>

					<div className="hidden sm:flex sm:items-center">
						<Link to="/login" className="px-3 py-2 flex items-center uppercase font-code text-3xl leading-snug text-yellow hover:opacity-75">Login</Link>
					</div>

				</div> 
				
				<div className="block sm:hidden border-t-2 py-2">
					<div className="flex flex-col">
						<Link to="/register" className="px-3 py-2 flex items-center uppercase font-code text-3xl leading-snug text-yellow hover:opacity-75">Sign-Up</Link>
						<Link to="/aboutus" className="px-3 py-2 flex items-center uppercase font-code text-3xl leading-snug text-yellow hover:opacity-75">About Us</Link>
					
					<div className="flex justify-between items-center border-t-2 pt-2">
						<Link to="/login" className="px-3 py-2 flex items-center uppercase font-code text-3xl leading-snug text-yellow hover:opacity-75">Login</Link>
						
					</div>
					</div>
				</div>
				</div>
			</div>
			

		</>
	 	)
	 }

	return (
		<nav className="flex items-center justify-between flex-wrap bg-cyan-600 p-6">
			<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				<div className="text-sm lg:flex-grow">
					{currentUser ? loggedIn() : loggedOut()}
				</div>
			</div>
		</nav>
	)
}



