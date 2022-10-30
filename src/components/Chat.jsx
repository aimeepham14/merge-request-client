import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'


export default function Chat({sortedMessages, currentUser, selectedUser}) {
    const navigate = useNavigate()
    const profileLink = [<Link className=" underline font-medium text-2xl font-code text-[#8a8a8a] hover:underline" to={`/requests/${selectedUser._id}`}>Check out {selectedUser.firstName}'s profile here</Link>] 
    const displayMessages = sortedMessages.map((message,i) => {
        const timePosted = new Date(message.timestamp)
        const time = timePosted.toLocaleString()
        return (
            <div key={`${i}`}>
                <div>
                    {/* HI AIMEE IF IT HELPS THIS CONDITIONAL CHANGES THE CLASS NAME IF THE MESSAGE IS FROM ANOTHER USER, IT DEFAULTS TO 'left'*/}
                    <div className= {`${(message.name==selectedUser.firstName) ? 'right' : 'left'}`}>
                        <img className=" image rounded-full shadow-xl w-20 h-20" src={message.img_url}></img>
                    {/* <span className="flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end">{message.name}</span> */}
                    <span className=" name flex ml-1 text-2xl h-auto text-orange font-code rounded-sm px-1 p-1 items-end">{message.name}</span>
                    <span className=" msg flex ml-1 text-2xl h-auto text-white font-code rounded-sm px-1 p-1 items-end">{message.content}<span className="text-[#8a8a8a] pl-1 text-sm" >{time}</span></span>
                    </div>
                </div>
                {/* <p>{message.content} sent: {time}</p> */}
            </div>

            
        )
    })
    return (
       <div className="bg-[#cecece] pb-20">
        {!selectedUser._id ? <p></p> : profileLink}
        {displayMessages}
       </div>
    )
}




