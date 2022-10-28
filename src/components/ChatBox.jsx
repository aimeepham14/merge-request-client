import axios from 'axios'
import { useState } from 'react'

export default function ChatBox({currentUser, selectedUser, usersMessages, otherUsersMessages}) {

    const [chat, setChat] = useState(null)

    const userId = currentUser?.id
    const otherUserId = selectedUser?._id

    const newMessage = async () => {
        const reqBody = {
            from: userId,
            to: otherUserId,
            content: chat,
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/messages/new`, reqBody)
            usersMessages()
            otherUsersMessages()
            setChat('')
        }catch(err){
            console.warn(err)
        }
    }

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
            <button class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-2xl text-yellow font-code" type='submit' onClick={newMessage}>Submit Text</button>
        </div>
    )
}