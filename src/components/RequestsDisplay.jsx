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
                // <div key={match.id} onClick={() => setSelectedUser(match)}>  
                //     <div>
                //         <img src={match.photo}/>
                //     </div>
                //     <p>{match.firstName}</p>
                //     <button onClick={() => handleDelete(match)}>Delete Match</button>
                // </div>
                <div key={match.id} onClick={() => setSelectedUser(match)}> 
                <div className="p-8 bg-[#1C1C1C] shadow-slate-50  shadow-2xl min-h-screen flex justify-center items-center ">
                <div class="max-w-lg container bg-[#1C1C1C] shadow-slate-50  shadow-2xl rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl ">
                  <div className="flex items-center justify-center">
                      <img  className="scale-75" src={match.photo}/>
                  </div>
                  <div>
                    <div className="pt-2 pb-8">
                      <h1 className="text-5xl font-bold font-code text-primary">{match.firstName}</h1>
                      <p class="text-2xl text-white font-code pt-2">{match.city}</p>
              
                      <p className="mt-6 text-white font-code"> About me: {match.biography}</p>
              
                      <div className="flex justify-around mt-8">
              
                      <button className="w-5/12 px-6 py-3 mt-3 mb-6 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-[#F23D41] hover:bg-red-800 hover:shadow-lg focus:outline-none"  onClick={() => handleDelete(match)}>Delete Match
                      </button>
              
                      </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>

            ))}
        </div>
    )
}



