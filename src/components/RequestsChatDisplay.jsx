import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Chat from './Chat'
import ChatBox from './ChatBox'

export default function RequestsChatDisplay({currentUser}) {
    const [userMessages, setUserMessages] = useState(null)
    const [otherUserMessages, setOtherUserMessages] = useState(null)
    const userId = currentUser.id
    const clickedUserId = '6359802dfd3905ca2e1b4ffe'

    // const clickedMatchId = clickedMatch?.id
    const usersMessages = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/messages/${userId}/${clickedUserId}`)
        setUserMessages(response.data)
        // console.log(response)
        // console.log(userMessages)
        } catch(err){
            console.warn(err)
        }
        
    }
    const otherUsersMessages = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/messages/${clickedUserId}/${userId}`)
        setOtherUserMessages(response.data)
        // console.log(response)
        // console.log(userMessages)
        } catch(err){
            console.warn(err)
        }
        
    }

    useEffect(()=> {
        usersMessages()
        otherUsersMessages()
    }, [])

    const messages = []

    userMessages?.forEach(message => {
        const messageArray = {}
        messageArray['name'] = currentUser?.firstName
        messageArray['img_url'] = currentUser?.photo
        messageArray['content'] = message.content
        messageArray['timestamp'] = message.createdAt
        messages.push(messageArray)
        // console.log(messages)
        
    })

    // ADD CLICKED USER ONCE DONE
    otherUserMessages?.forEach(message => {
        const messageArray = {}
        messageArray['name'] = 'Tyler'
        messageArray['img_url'] = 'http://res.cloudinary.com/dspcnzoiy/image/upload/v1666809899/a2kqsqrg9t4auz6xc9yk.jpg'
        messageArray['content'] = message.content
        messageArray['timestamp'] = message.createdAt
        messages.push(messageArray)
        // console.log(messages)
        
    })

    const sortedMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))
    return (
        <div>
            <Chat 
            sortedMessages={sortedMessages}/>
            <ChatBox 
            currentUser={currentUser}
            usersMessages={usersMessages}
            otherUsersMessages={otherUsersMessages}
            />
        </div>
    )
}