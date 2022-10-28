import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import TinderCard from "react-tinder-card"
// import UserProfile from "../UserProfile"
import axios from "axios"

export default function Swipe({currentUser}) {
    const [users, setUsers] = useState([])
    const [lookingForUsers, setLookingForUsers] = useState([])
    const [lookingFor, setLookingFor] = useState("No Preference")
    const { userId } = useParams()
    const [lastDirection, setLastDirection] = useState('')

    // SAVE THE USER ID THAT APPEARS ON SWIPE
    const [selectedUser, setSelectedUser] = useState('')
    // SAVE THE USER PROFILE THAT APPEARS ON SWIPE
    const [checkUser, setCheckUSer] = useState([])

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`)
            const responseData = response.data
            console.log('DATA FROM BACKEND',responseData)
            const info = responseData.map((data)=> {
                return({
                    id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    matchedUsers: data.matchedUsers,
                    likedUsers: data.likedUsers,
                    rejectedUsers: data.rejectedUsers,
                    photos: data.photo,
                    favoritePLanguage: data.favoritePLanguage
                }
                )
            })
            console.log('SAVED INFO DATA', info)
            setUsers(info)
            // console.log(users)
            
        } catch(err) {
            console.warn(err)
        }
    }

    useEffect(() => {
        getAllUsers()
    },[])

    useEffect(()=> {
        const getSelectedUser = async() => {
            try{
                const token = localStorage.getItem('jwt')
					// make the auth headers
					const options = {
						headers: {
							'Authorization': token
						}
					}
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${selectedUser}`, options)
                console.log('getting one user', response)
                const data = response.data
                const info = {
                    id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    matchedUsers: data.matchedUsers,
                    likedUsers: data.likedUsers,
                    rejectedUsers: data.rejectedUsers,
                    photos: data.photo,
                    favoritePLanguage: data.favoritePLanguage
                }
            setCheckUSer(info)
            console.log('CHECKED USER ARRAY', info) 
            }catch(err){
                console.log(err)
            }
        }
        getSelectedUser()
        if (lastDirection == 'right') {
            handlePull()
            console.log('HANDLING PULL')
        } else if (lastDirection == 'left'){
            handlePush()
            console.log('HANDLING PUSH')

        }
    },[selectedUser])

    useEffect(()=> {
        const compareUsersLikedArray = async() => {
            try {
                const body = {
                    otherperson: checkUser.email
                }
                const body2 = {
                    otherperson: currentUser.email
                }
                if (checkUser.likedUsers.includes(currentUser.id)){
                    console.log('TRUE')
                    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}/addmatch`, body)
                    const response2 = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${checkUser.id}/addmatch`, body2)
                    console.log(response, response2)
                }
                else {
                    console.log('FALSE')
                }
            }catch(err){
                console.log(err)
            }
        }
        compareUsersLikedArray()
    }, [checkUser])


    // it just adds it to the rejected array for now
    const handlePush = async () => {
        console.log( 'PUSHING')
        try {
            const body = {
                rejectedUsers: selectedUser
            }
            // console.log(e.target.value)
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/rejected`, body)
        } catch(err) {
            console.warn(err)
        }
    }
    // it just adds it to the liked array for now
    const handlePull = async () => {
        console.log( 'PULLING')
        // console.log('ONE USERS ID',selectedUser)
        try {
            const body = {
                likedUsers: selectedUser
            }
            console.log('ONEUSERID', body)
            // console.log(e.target.value)
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}/liked`, body)
        } catch(err) {
            console.warn(err)
        }
    }

    // const setVariables = (direction, id) => {
    //     setLastDirection(direction)
    //     setSelectedUser(id)
    // }

    const swiped = (direction, name, id) => {
        // const response = await setVariables(direction, id)
        console.log(name + 'swiped '+ direction)
        console.log(direction)
        console.log(id)
        setLastDirection(direction)
        setSelectedUser(id)
        // setLastDirection(direction)
        console.log('IS DIRECTION SHOWING UP?',lastDirection)
        // setSelectedUser(id)
    //     if(lastDirection == 'left'){
    //         handlePush()
    //     }
    //     else if(lastDirection == 'right'){
    //         handlePull()
    //     }
    }
    
    const outOfFrame = (name) => {
        console.log(name + 'out of screen!')
    }

    // const allUsers = users.map((user) => {
    //     return(
            
    //         <div>
    //             {props.currentUser.id !== user.id ? 
    //             <div class="p-10 bg-gray-700 flex justify-center items-center">
    //                 <div class="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                        
    //                 <div class="mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 text-6xl font-code text-orange">{users[count].firstName} {users[count].lastName}</div>
    //                 <div>Favorite Programming Language: {users[count].favoritePLanguage}</div>
    //                 <div className="flex">
    //                     <img className="mx-auto max-w-md max-h-md" src={users[count].photos} alt={`pic of ${users[count].firstName}`}></img>
    //                 </div>
    //                 <button onClick={handlePush} value={users[count].id}>Push</button>
    //                 <button onClick={handlePull} value={users[count].id}>Pull</button> 
    //                 </div>
    //             </div>
    //             : 
    //             <div></div>
    //             }
    //         </div>
            
    //     )       
    // })

    // useEffect(() => {
    //     const getLookingForUsers = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/lookingfor`)
    //             console.log(response.data)
    //             const responseData = response.data
    //             const info = responseData.map((data)=> {
    //                 return({
    //                     id: data._id,
    //                     firstName: data.firstName,
    //                     lastName: data.lastName,
    //                     matchedUsers: data.matchedUsers,
    //                     likedUsers: data.likedUsers,
    //                     rejectedUsers: data.rejectedUsers,
    //                     photos: data.photo,
    //                     favoritePLanguage: data.favoritePLanguage
    //                 }
    //                 )
    //             })
    //             console.log('RESETTING USERS FROM PREFERENCE',info)
    //             setUsers(info)
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
                console.log('RESETTING USERS FROM PREFERENCE',info)
                setUsers(info)
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
    

    const blankCard = <div>No More Matches</div>

    return(
    <div>
        <h1>The Swipe Page</h1>
        <form onSubmit={handleSubmit}>
            <label for="lookingFor">Looking For:</label>
            <select id="lookingFor" name="lookingFor" onChange ={e => setLookingFor(e.target.value)}>
                <option value="No Preference">No Preference</option>
                <option value="Woman">Man</option>
                <option value="Man">Woman</option>
                <option value="Friends">Friends</option>
            </select>
            <button type="submit">Filter</button>
        </form>
        <div>
            <div className='tinderCards'>
                <div className='tinderCardsContainer'>
                {users.map(user=> (
                    <TinderCard
                    className='swipe'
                    key={user.id}
                    preventSwipe={['up', 'down']}
                    onSwipe={dir => swiped(dir, user.firstName, user.id)}
                    onCardLeftScreen={() => outOfFrame(user.firstName)}>
                        <div className='card' style={{backgroundImage: `url(${user.photos})`}}>
                            <h1 className='card'>{user.firstName}</h1>
                        </div>
                    </TinderCard>
                ))}
                </div>
                <div className='swipeDirection'>
                    {lastDirection == 'left'? <h2 className='infoText'>You Pushed!</h2> : <h2 className='infoText' />}
                    {lastDirection == 'right'? <h2 className='infoText'>You Pulled!</h2> : <h2 className='infoText' />}
                </div>
            </div>
        </div>
    </div>
    )
}