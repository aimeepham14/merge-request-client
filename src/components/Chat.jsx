import { useState } from 'react'

export default function Chat({sortedMessages}) {
    const displayMessages = sortedMessages.map((message,i) => {
        return (
            <div key={`${i}`}>
                <div>
                    <div>
                        <img src={message.img_url} style={{height: 100}}></img>
                    </div>
                    <p>{message.name}</p>
                </div>
                <p>{message.content} sent:{message.timestamp}</p>
            </div>
        )
    })
    return (
       <div>
        {displayMessages}
       </div>
    )
}