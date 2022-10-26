import { useState } from 'react'

export default function ChatBox() {
    const [chat, setChat] = useState(null)
    return (
        <div>
            <textarea 
            type='text' 
            className="w-full rounded-lg border-white p-4 pr-12 text-sm shadow-sm"
            placeholder='Code a message...' 
            onChange={e => setChat(e.target.value)}
            value={chat}
            style={{color: 'black'}}
            ></textarea>
            <button class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-2xl text-yellow font-code" type='submit'>Submit Text</button>
        </div>
    )
}