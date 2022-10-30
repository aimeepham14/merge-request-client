import { useState, useEffect } from 'react'
import axios from 'axios'
import QueryString from 'qs'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'

export default function RequestsDisplay( {currentUser, setSelectedUser} ) {
    const [matchedUsersProf, setMatchedUsersProf] = useState([])
    const [matches, setMatches] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [matchSelected, setMatchSelected] = useState([])
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
                <div key={match._id}> 
                    {/* <div className="p-8 bg-[#1C1C1C] shadow-slate-50  shadow-2xl min-h-screen flex justify-center items-center ">
                        <div class="max-w-lg container bg-[#1C1C1C] shadow-slate-50  shadow-2xl rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl ">
                            <div className="flex items-center justify-center" onClick={() => setSelectedUser(match)}>
                                <img  className="scale-75" src={match.photo} alt={`${match.name}'s pic`}/>
                            </div>
                            <div>
                                <div className="pt-2 pb-8">
                                    <h1 className="text-5xl font-bold font-code text-primary" onClick={() => setSelectedUser(match)}>{match.firstName}</h1>
                                    <p class="text-2xl text-white font-code pt-2">{match.city}</p>
                            
                                    <p className="mt-6 text-white font-code"> About me: {match.biography}</p>
                        
                                <div className="flex justify-around mt-8">
                                    <button className="w-5/12 px-6 py-3 mt-3 mb-6 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-[#F23D41] hover:bg-red-800 hover:shadow-lg focus:outline-none"   onClick={(e) => { handleModal(e); setMatchSelected(match)}}>Delete Match {console.log(match)}
                                    </button>
                                </div>
                            
                            </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="min-h-screen bg-[#1C1C1C]  flex justify-center items-center">
                    <div className="max-w-lg container bg-white rounded-xl shadow-slate-50  shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-2xl " onClick={() => setSelectedUser(match)}>
                        
                        <img className="w-min cursor-pointer" src={match.photo} alt={`${match.name}'s pic`}/>
                        <div className="flex p-4 justify-between">
                            <div className="items-center space-x-2">
                            <h1 className="text-gray-800 cursor-pointer text-4xl mb-1  text-left font-code text-secondary font-bold "> {match.firstName}, {match.age} </h1>
                            <h2 className="text-gray-800 cursor-pointer text-2xl mb-2  text-left font-code text-aqua"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg> 
                                {match.city}
                            </h2>
                            <h2 className="text-gray-800 cursor-pointer text-1xl mb-2 text-left font-code text-aqua mt-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                </svg>
                                {match.favoritePLanguage}
                            </h2>
                            <h2 className="text-gray-800 cursor-pointer text-1xl mb-6 text-left font-code text-aqua">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                {match.biography}
                            </h2>
                           
                            <div className="relative w-full mb-3">
                                <button className="w-36 px-6 py-3 ml-24 mt-3 mb-4 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-300 hover:shadow-lg focus:outline-none"  onClick={(e) => { handleModal(e); setMatchSelected(match)}}>UNMATCH {console.log(match)}
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
                                className="w-6/12 px-6 py-3 mt-3 text-lg font-code text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-600 hover:bg-yellow-500 hover:shadow-lg focus:outline-none" onClick = {() => setShowModal(false)}
                            >
                                Oops, revert press.
                            </button>
                        </div>
                    </Modal>
        </div>
    )
}



