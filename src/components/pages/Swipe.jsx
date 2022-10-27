import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'


export default function Swipe(props) {
    const [users, setUsers] = useState([])
    const [lookingForUsers, setLookingForUsers] = useState([])
    const [lookingFor, setLookingFor] = useState("No Preference")
    
    const { userId } = useParams()
  
    

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`)
                const responseData = response.data
                const info = responseData.map((data)=> {
                    return({
                        id: data._id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        matchedUsers: data.matchedUsers,
                        likedUsers: data.likedUsers,
                        rejectedUsers: data.rejectedUsers,
                        photos: data.photo,
                        favoritePLanguage: data.favoritePLanguage

                    }
                    )
                })
                setUsers(info)
                
            } catch(err) {
                console.warn(err)
            }
        }
        getAllUsers()
    },[])

    const handlePush = async (e) => {
        e.preventDefault()
        try {
            const body = {
                rejectedUsers: e.target.value
            }
            console.log(e.target.value)
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/rejected`, body)
          
        } catch(err) {
            console.warn(err)
        }
    }

    const handlePull = async (e) => {
        e.preventDefault()
        try {
            const body = {
                likedUsers: e.target.value
            }
            console.log(e.target.value)
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/liked`, body)
          
        } catch(err) {
            console.warn(err)
        }
    }

    const allUsers = users.map((user) => {
        return(
            
            <div>
                {props.currentUser.id !== user.id ? 
                <div class="p-10 bg-gray-700 flex justify-center items-center">
                    <div class="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                        
                    <div class="mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 text-6xl font-code text-orange">{user.firstName} {user.lastName}</div>
                    <div>Favorite Programming Language: {user.favoritePLanguage}</div>
                    <div className="flex">
                        <img className="mx-auto max-w-md max-h-md" src={user.photos} alt={`pic of ${user.firstName}`}></img>
                    </div>
                    <button onClick={handlePush} value={user.id}>Push</button>
                    <button onClick={handlePull} value={user.id}>Pull</button> 
                    </div>
                </div>
                : 
                <div></div>
                }
            </div>
            
        )       
    })

    // useEffect(() => {
    //     const getLookingForUsers = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/lookingfor`)
    //             console.log(response.data)
    //             const responseData = response.data
    //             const info = responseData.map((data)=> {
    //                 return({
    //                     id: data._id,
    //                     matchedUsers: data.matchedUsers,
    //                     likedUsers: data.likedUsers
    //                 }
    //                 )
    //             })
    //             console.log(info)
    //             setLookingForUsers(info)
    //         } catch(err) {
    //             console.warn(err)
    //         }
    //     }
    //     getLookingForUsers()
    // },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
    
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/lookingfor/${lookingFor}`)
                console.log("lookingFor", lookingFor)
                console.log("response", response)

                const responseData = response.data
                const info = responseData.map((data)=> {
                    return({
                        id: data._id,
                        matchedUsers: data.matchedUsers,
                        likedUsers: data.likedUsers
                    }
                    )
                })
                console.log(info)
                setLookingForUsers(info)
        } catch(err) {
            console.warn(err)
        }
    }

    // const swipedUsers = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}`)
        
            // const ids = users.map((user) => {
            //     return (
            //         user.id
            //     )
            // })
   
            // const likedOut = ids.filter(user => response.data.likedUsers.includes(user)) 
            // const likedOut = await ids.filter(function(obj) { return response.data.likedUsers.indexOf(obj) == -1; })

            // const rejectedOut = await likedOut.filter(function(obj) { return response.data.rejectedUsers.indexOf(obj) == -1; })
  
    //         return rejectedOut
    //     } catch(err) {
    //         console.warn(err)
    //     }  
    // }

    // const swipedUsers = users.map((user) => {
    //     try {
    //         const ids = users.map((user) => {
    //             return (
    //                 user.id
    //             )
    //         })
    //         const response = axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}`)
    //         const likedOut = ids.filter(function(obj) { return response.data.likedUsers.indexOf(obj) == -1; })

    //         const rejectedOut = likedOut.filter(function(obj) { return response.data.rejectedUsers.indexOf(obj) == -1; })
            
    //     } catch(err) {
    //         console.warn(err)
    //     }
    //     return (
    //         <div>{user.rejectedOut}</div>
            
    //     )
    // })
    

    
    return(
    <div>
        <h1>The Swipe Page</h1>
        <form onSubmit={handleSubmit}>
            <label for="lookingFor">Looking For:</label>
            <select id="lookingFor" name="lookingFor" onChange ={e => setLookingFor(e.target.value)}>
                <option value="No Preference">No Preference</option>
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
                <option value="Friends">Friends</option>
            </select>
            <button type="submit">Filter</button>
        </form>
        <div>{allUsers}</div>
    </div>
    )
}