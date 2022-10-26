import { useEffect, useState } from "react"
import axios from "axios"

export default function Swipe(props) {
    const [users, setUsers] = useState([])
    const [lookingForUsers, setLookingForUsers] = useState([])
    const [lookingFor, setLookingFor] = useState("No Preference")

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`)
                console.log(response.data)
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
                setUsers(info)
            } catch(err) {
                console.warn(err)
            }
        }
        getAllUsers()
    },[])

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
            const reqBody = lookingFor
            
            console.log(reqBody)
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/lookingfor`, reqBody)
                console.log(response.data)
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

    </div>
    )
}