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
        
        <div className="relative bg-[#1C1C1C]">
            <textarea 
            type='text' 
            className="rounded-full w-full pl-6 pr-12 py-2 focus:outline-none  h-20 placeholder-gray-100 bg-gray-900 text-white font-code shadow-slate-50  shadow-2xl"
            placeholder='Code a message...' 
            onChange={e => setChat(e.target.value)}
            value={chat}
            ></textarea>
            <button className="w-2/12 px-6 py-3 mt-3 mb-6 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow-300 hover:bg-yellow-500 hover:shadow-lg focus:outline-none" type='submit' onClick={newMessage}>Send Message</button>
        </div>
    


    )
}
