import { useState, useEffect } from 'react'
import axios from 'axios'
import QueryString from 'qs'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'

export default function RequestsDisplay( {currentUser, setSelectedUser} ) {
    const [matchedUsersProf, setMatchedUsersProf] = useState([])
    const [matches, setMatches] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [matchSelected, setMatchSelected] = useState({})
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
        setSelectedUser(null)
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
            window.location.reload(false);
        }
    }

    const handleModal = async (e) => {
        e.preventDefault()
        try {
            setShowModal(true)
        } catch (err) {
            console.warn(err)
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
                <div key={match.id}> 
                    <div className="p-8 bg-[#1C1C1C] shadow-slate-50  shadow-2xl min-h-screen flex justify-center items-center ">
                        <div class="max-w-lg container bg-[#1C1C1C] shadow-slate-50  shadow-2xl rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl ">
                            <div className="flex items-center justify-center" onClick={() => setSelectedUser(match)}>
                                <img  className="scale-75" src={match.photo}/>
                            </div>
                            <div>
                                <div className="pt-2 pb-8">
                                    <h1 className="text-5xl font-bold font-code text-primary" onClick={() => setSelectedUser(match)}>{match.firstName}</h1>
                                    <p class="text-2xl text-white font-code pt-2">{match.city}</p>
                            
                                    <p className="mt-6 text-white font-code"> About me: {match.biography}</p>
                        
                                <div className="flex justify-around mt-8">
                                    <button className="w-5/12 px-6 py-3 mt-3 mb-6 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-[#F23D41] hover:bg-red-800 hover:shadow-lg focus:outline-none"  value={match} onClick={(e) => { handleModal(e); setMatchSelected(e.target.value)}}>Delete Match {console.log(match)}
                                    </button>
                                </div>
                            
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))}
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                        <div className="p-6">
                            <div className="text-red">Are you sure you would like to delete this match?</div>
                            <button  
                                id="confirmDelete"
                                className="w-5/12 px-6 py-3 mt-3 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-600 hover:bg-yellow-500 hover:shadow-lg focus:outline-none" onClick = {() => handleDelete(matchSelected)}
                            >
                                Yes, force push!
                            </button>
                            <button  
                                id="nope"
                                className="w-5/12 px-6 py-3 mt-3 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-600 hover:bg-yellow-500 hover:shadow-lg focus:outline-none" onClick = {() => setShowModal(false)}
                            >
                                Oops, revert press.
                            </button>
                        </div>
                    </Modal>
        </div>
    )
}



