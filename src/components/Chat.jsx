import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'

export default function Chat({sortedMessages, currentUser, selectedUser}) {
    const navigate = useNavigate()
    const profileLink = [<Link to={`/requests/${selectedUser._id}`}>{selectedUser.firstName}'s Profile</Link>] 
    const displayMessages = sortedMessages.map((message,i) => {
        const timePosted = new Date(message.timestamp)
        const time = timePosted.toLocaleString()
        return (
            <div key={`${i}`}>
                <div>
                    {/* HI AIMEE IF IT HELPS THIS CONDITIONAL CHANGES THE CLASS NAME IF THE MESSAGE IS FROM ANOTHER USER, IT DEFAULTS TO 'left'*/}
                    <div className={`${(message.name==selectedUser.firstName) ? 'right' : 'left'}`}>
                        <img src={message.img_url} style={{height: 100}}></img>
                    </div>
                    <p>{message.name}</p>
                </div>
                <p>{message.content} sent: {time}</p>
            </div>
        )
    })
    return (
       <div>
        {!selectedUser._id ? <p></p> : profileLink}
        {displayMessages}
       </div>
    )
}