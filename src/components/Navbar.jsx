import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import NavBarMobile from './NavBarMobile'
import NavBarMobileNewUser from './NavBarMobileNewUser'

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

			<div className='right-6 md:hidden top-6 scale-150' style={{alignItems:'center'}} onClick={showMenu} >
                <img src='/HamburgerMenu.png' style={{height: '50px', marginLeft:'39vw'}} className='scale-150 cursor-pointer'/>
            </div>
			
			<div className="hidden md:flex flow-root">
				<div className="float-left">
					<Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">MergeRequest</Link>

					<Link to={`/swipe/${currentUser.id}`} className="mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">Swipe</Link>

					<Link to="/requests" className="mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">Requests</Link>
					<Link to="/aboutmr" className="mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">aboutmr</Link>
				</div>

				<div className="float-right">
					<Link to="/profile" className="mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10 pl-10">Profile</Link>

					<Link to="/" className=" mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-4"><span onClick={handleLogout}>logout</span></Link>
				</div>
			</div>
			<NavBarMobile showMenu={showMenu} active={active} currentUser={currentUser} handleLogout={handleLogout}/>
			
		</>
		)
	 }

	 const loggedOut = () => {
		return(
		<>
		<div className='right-6 md:hidden top-6 scale-150' style={{alignItems:'center'}} onClick={showMenu} >
                <img src='/HamburgerMenu.png' style={{height: '50px', marginLeft:'39vw'}} className='scale-150 cursor-pointer'/>
            </div>
			{/* if the user is not logged in... */}
			<div className='hidden md:flex flow-root'>
			<Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">MergeRequest</Link>

			<Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">Sign-Up</Link>

			<Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-yellow font-code text-3xl mr-10">Login</Link>

			</div>
			
			<NavBarMobileNewUser showMenu={showMenu} active={active} currentUser={currentUser} handleLogout={handleLogout}/>
		</>
	 	)
	 }

	return (
		<nav class="flex items-center justify-between flex-wrap bg-cyan-600 p-6">
			<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				<div class="text-sm lg:flex-grow">
					{currentUser ? loggedIn() : loggedOut()}
				</div>
			</div>
		</nav>
	)
}