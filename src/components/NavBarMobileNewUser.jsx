import React from 'react'
import { Link, useParams } from 'react-router-dom'
const NavBarMobileNewUser = ({showMenu, active, currentUser, handleLogout}) => {
  return (
    <ul className={active ? 'flex-col flex items-center fixed inset-0 left-4/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 md:hidden md:z-index: 50;' : 'hidden'}>
        {/* <img src='/HamburgerMenu.png' style={{height: '50px'}} onClick={showMenu} className='scale-150 cursor-pointer'/> */}
        <li><Link to="/" onClick={showMenu} className={'text-yellow font-code text-3xl mr-10'}>Merge Request</Link></li>
        
        <li><Link to="/register" onClick={showMenu} className={'text-yellow font-code text-3xl mr-10'}>Swipe</Link></li>

        <li><Link to="/login" onClick={showMenu} className={'text-yellow font-code text-3xl mr-10'}>Requests</Link></li>

    </ul>
  )
}
export default NavBarMobileNewUser