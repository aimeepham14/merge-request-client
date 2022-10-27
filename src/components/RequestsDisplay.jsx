import { useState, useEffect } from 'react'
import axios from 'axios'

export default function RequestsDisplay( {currentUser} ) {
    const [matchedUsersProf, setMatchedUsersProf] = useState([])
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

    useEffect(() => {
            const allMatches = async () => {
            const body = {
                matchedusers: matches}
            console.log('ALL MATCHES',matches)
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/matchedusers`, body)
                console.log('BACKEND RESPOSNE FOR CURRENT USER',response)
                const data = response.data
                setMatchedUsersProf(data)
                console.log(data)
            }catch(err){
                console.log(err)
            }        
        }
        allMatches()
    }, [matches])
    
    return (
        <div>
            List of matches
        </div>
    )
}