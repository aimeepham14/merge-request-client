import { useState } from 'react'
import RequestsChatDisplay from '../RequestsChatDisplay'
import RequestsDisplay from '../RequestsDisplay'
import RequestsHeader from '../RequestsHeader'
import { Link } from 'react-router-dom'


export default function Requests({currentUser}) {
    const [ selectedUser, setSelectedUser ] = useState(null)

    const Requests = (
        <div style={{backgroundColor: 'black', color:'white'}}>
            <RequestsHeader/>
            <div>
                <button>Approved Requests</button>
                <button>Chat || Code</button>
            </div>
            <RequestsDisplay/>

            <RequestsChatDisplay/>
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