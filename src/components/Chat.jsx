import { useState } from 'react'

export default function Chat({sortedMessages}) {
    const displayMessages = sortedMessages.map((message,i) => {
        const timePosted = new Date(message.timestamp)
        console.log(timePosted)
        const time = timePosted.toLocaleString()
        return (
            <div key={`${i}`}>
                <div>
                    <div>
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
        {displayMessages}
       </div>
    )
}