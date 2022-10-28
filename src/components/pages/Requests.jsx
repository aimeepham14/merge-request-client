import { useState, useEffect } from 'react'
import RequestsChatDisplay from '../RequestsChatDisplay'
import RequestsDisplay from '../RequestsDisplay'
import RequestsHeader from '../RequestsHeader'
import { Link } from 'react-router-dom'
import axios from 'axios'
import userEvent from '@testing-library/user-event'

export default function Requests({currentUser}) {
    const [ selectedUser, setSelectedUser ] = useState([])
    // const [matches, setMatches] = useState([])
    console.log('SELECTED USER', selectedUser)
    const Requests = (
        <div style={{backgroundColor: 'black', color:'white'}}>
            <RequestsHeader currentUser={currentUser}/>
            <div>
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={()=> setSelectedUser('')}
                >Approved Requests</button>
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!selectedUser} >Chat || Code</button>
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