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
			
			<div className="lg:flex flex-grow items-center" id="example-navbar-warning">
						<Link to="/" className="text-3xl font-code leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-yellow">Merge Request</Link>
				<ul className="flex flex-col lg:flex-row list-none ml-auto">
					<li className="nav-item">
						<Link to={`/swipe/${currentUser.id}`} className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Swipe</Link>
					</li>
					<li className="nav-item">
						<Link to="/requests" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Requests</Link>
					</li>
					<li className="nav-item">
						<Link to="/aboutme" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">About Me</Link>
					</li>
					<li className="nav-item">
					<Link to="/profile" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Profile</Link>
					</li>
					<li className="nav-item">
					<Link to="/" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75"><span onClick={handleLogout}>Logout</span></Link>
					</li>
				</ul>
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
			<div className="lg:flex flex-grow items-center" id="example-navbar-warning">
			<div className='hidden md:flex flow-root'>
			<ul className="flex flex-col lg:flex-row list-none ml-auto">
			<li className="nav-item">
				<Link to="/" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">MergeRequest</Link>
			</li>
				<Link to="/register" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Sign-Up</Link>
			<li className="nav-item">
				<Link to="/login" className="px-3 py-2 flex items-center uppercase font-code text-2xl leading-snug text-yellow hover:opacity-75">Login</Link>
			</li>
			</ul>
			</div>
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



<nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3">
  <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
    <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
      <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
        pink Color
      </a>
      <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
        <span className="block relative w-6 h-px rounded-sm bg-white"></span>
        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
      </button>
    </div>

	
    <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
      <ul className="flex flex-col lg:flex-row list-none ml-auto">
          <li className="nav-item">
            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
              Discover
            </a>
          </li>
          <li className="nav-item">
            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
              Setting
            </a>
          </li>
      </ul>
    </div>
  </div>
</nav>