import { useState } from 'react'
import Chat from './Chat'
import ChatBox from './ChatBox'

export default function RequestsChatDisplay() {
    return (
        <div>
            <Chat/>
            <ChatBox/>
        </div>
    )
}