import { useState, useEffect } from 'react'
import axios from 'axios'
import QueryString from 'qs'
import { useNavigate } from 'react-router-dom'

export default function RequestsDisplay( {currentUser, setSelectedUser} ) {
    const [matchedUsersProf, setMatchedUsersProf] = useState([])
    const [matches, setMatches] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const allMatches = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}`)
                console.log('BACKEND RESPOSNE FOR CURRENT USER',response)
                const data = response.data
                const info = {
                    matchedUsers: data.matchedUsers
                }
                setMatches(data.matchedUsers)
                console.log(info)
            }catch(err){
                console.log(err)
            }        
        }
        allMatches()
    }, [])

    useEffect(() => {
            const setallmatches = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/matchedusers`, {params: {matchids: JSON.stringify(matches)}})
                console.log('BACKEND RESPOSNE FOR CURRENT USER',response)
                const data = response.data
                setMatchedUsersProf(data)
                console.log(data) 
            }catch(err){
                console.log(err)
            }        
        }
        setallmatches()
    }, [matches])


    
    const handleDelete = async (match) => {
        const body = {
            otherperson: match.email
        }
        const body2 = {
            otherperson: currentUser.email
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}/deletematch`, body)
            const response2 = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${match._id}deletematch`, body2)
        }catch(err){
            console.log(err)
        }finally {
            navigate('/requests')
        }
    }


    return (
        <div>
            {matchedUsersProf?.map(match=> (
                <div key={match.id} onClick={() => setSelectedUser(match)}>  
                    <div>
                        <img src={match.photo}/>
                    </div>
                    <p>{match.firstName}</p>
                    <button onClick={() => handleDelete(match)}>Delete Match</button>
                </div>
            ))}
        </div>
    )
}