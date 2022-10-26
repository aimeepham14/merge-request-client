import { useState } from 'react'
import RequestsChatDisplay from '../RequestsChatDisplay'
import RequestsDisplay from '../RequestsDisplay'
import RequestsHeader from '../RequestsHeader'

export default function Requests(currentUser) {
    const [ selectedUser, setSelectedUser ] = useState(null)
    return (
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
}