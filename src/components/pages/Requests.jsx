import { useState, useEffect } from 'react'
import RequestsChatDisplay from '../RequestsChatDisplay'
import RequestsDisplay from '../RequestsDisplay'
import RequestsHeader from '../RequestsHeader'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Requests({currentUser}) {
    const [ selectedUser, setSelectedUser ] = useState(null)
    const [matches, setMatches] = useState([])
    useEffect(() => {
        const allMatches = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}`)
                console.log('BACKEND RESPOSNE FOR CURRENT USER',response)
                const data = response.data
                const info = {
                    matchedUsers: data.matchedUsers
                }
                setMatches(info)
                console.log(info)
            }catch(err){
                console.log(err)
            }        
        }
        allMatches()
    }, [])

    // console.log(currentUser.id)
    const Requests = (
        <div style={{backgroundColor: 'black', color:'white'}}>
            <RequestsHeader currentUser={currentUser}/>
            <div>
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={()=> setSelectedUser('')}
                >Approved Requests</button>
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!selectedUser} >Chat || Code</button>
            </div>
            {!selectedUser && <RequestsDisplay setSelectedUser={setSelectedUser} matches={matches}/>}

            {!selectedUser && <RequestsChatDisplay currentUser={currentUser}/>}
        </div>
    )

    const loginMessage = (
        <div>
            <p className='text-3xl font-bold mt-20'>Log in chat with other developers!</p>
            <Link to='/login'>
                <button className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-2xl text-yellow font-code">
                    Log in
                </button>
            </Link>
        </div>
    )
    return (
        <div>
            {currentUser ? Requests : loginMessage}
        </div>
    )
}