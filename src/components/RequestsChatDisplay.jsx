import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Chat from './Chat'
import ChatBox from './ChatBox'

export default function RequestsChatDisplay({currentUser, selectedUser}) {
    const [userMessages, setUserMessages] = useState(null)
    const [otherUserMessages, setOtherUserMessages] = useState(null)
    const userId = currentUser.id
    const clickedUserId = selectedUser._id

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
    }, [selectedUser])

    const messages = []

    userMessages?.forEach(message => {
        const messageArray = {}
        messageArray['name'] = currentUser?.firstName
        messageArray['img_url'] = currentUser?.photo
        messageArray['id'] = currentUser?.id
        messageArray['content'] = message.content
        messageArray['timestamp'] = message.createdAt
        messages.push(messageArray)
        console.log(messages)
        
    })

    // ADD CLICKED USER ONCE DONE
    otherUserMessages?.forEach(message => {
        const messageArray = {}
        messageArray['name'] = selectedUser?.firstName
        messageArray['img_url'] = selectedUser?.photo
        messageArray['id'] = selectedUser?._id
        messageArray['content'] = message.content
        messageArray['timestamp'] = message.createdAt
        messages.push(messageArray)
        // console.log(messages)
        
    })

    const sortedMessages = messages?.sort((x,y) => x.timestamp.localeCompare(y.timestamp))
    return (
        <div>
            <Chat 
            sortedMessages={sortedMessages}
            currentUser={currentUser}
            selectedUser={selectedUser}
            />
            <ChatBox 
            currentUser={currentUser}
            selectedUser={selectedUser}
            usersMessages={usersMessages}
            otherUsersMessages={otherUsersMessages}
            />
        </div>
    )
}