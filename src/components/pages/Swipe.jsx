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
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/rejected`, body)
            console.log(props.currentUser.id)
        } catch(err) {
            console.warn(err)
        }
    }

    const allUsers = users.map((user) => {
        return(
            <div>
                <div>{user.firstName} {user.lastName}</div>
                <div>Favorite Programming Language: {user.favoritePLanguage}</div>
                <div className="flex">
                    <img className="mx-auto" src={user.photos} alt={`pic of ${user.firstName}`}></img>
                </div>
                <button onClick={handlePush} value={user.id}>Push</button>
                <button>Pull</button>
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