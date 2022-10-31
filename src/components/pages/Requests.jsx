import { useState, useEffect } from 'react'
import RequestsChatDisplay from '../RequestsChatDisplay'
import RequestsDisplay from '../RequestsDisplay'
import RequestsHeader from '../RequestsHeader'
import { Link } from 'react-router-dom'
import axios from 'axios'
import userEvent from '@testing-library/user-event'

export default function Requests({currentUser}) {
    const [ selectedUser, setSelectedUser ] = useState(null)
    
    const Requests = (
        <div style={{backgroundColor: 'black', color:'white'}}>
            <RequestsHeader currentUser={currentUser}/>
            <div className="bg-[#1C1C1C] pt-8 pb-4">
            <a href="#_" className="relative inline-flex items-center justify-center px-6 py-4 mr-2 overflow-hidden font-code font-medium tracking-tighter text-white text-code bg-gray-800 rounded-lg group">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#28AD95] rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span className="relative" onClick={()=> setSelectedUser(null)} >Matches && Chat</span>
            </a>
            </div>
            {!selectedUser && <RequestsDisplay setSelectedUser={setSelectedUser} currentUser={currentUser}/>}

            {selectedUser && <RequestsChatDisplay currentUser={currentUser} selectedUser={selectedUser}/>}
        </div>
    )

    const loginMessage = (
        <div>
            <p className='text-3xl font-bold mt-20'>Log in chat with other developers!</p>
            <Link to='/login'>
                <button className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-2xl text-yellow font-code">
                    Log in
                </button>
            </Link>
        </div>
    )
    return (
        <div>
            {currentUser ? Requests : loginMessage}
        </div>
    )
}


