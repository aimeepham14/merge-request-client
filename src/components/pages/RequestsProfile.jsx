import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from 'axios'

export default function RequestsProfile(props){
    const [requestInfo, setRequestInfo] = useState({})
    const { requestId } = useParams()
    
    useEffect(() => {
        const requestProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${requestId}`)
                const responseData = {
                    biography: response.data.biography,
                    city: response.data.city,
                    favoritePLanguage: response.data.favoritePLanguage,
                    firstName: response.data.firstName,
                    gender: response.data.gender,
                    lastName: response.data.lastName,
                    lookingFor: response.data.lookingFor,
                    photo: response.data.photo,
                    id: response.data._id,
                    age: response.data.age
                }
                setRequestInfo(responseData)
            } catch (err) {
                console.warn(err)
            }
        }
        requestProfile()
    })

    return (
        <div className="min-h-screen bg-gray-700 flex justify-center items-center">
		<div className="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
		
			<div className= "relative pb-11/12">
			<img className="absolute h-full w-full object-cover cursor-pointer " src={requestInfo.photo}  alt="user profile pic" />
			</div>
			<div className="flex p-4 justify-between">
				<div className="items-center space-x-2">
				<h1 className="text-gray-800 cursor-pointer text-4xl mb-1  text-left font-code text-secondary font-bold "> {requestInfo.firstName}, {requestInfo.age} </h1>
				<h2 className="text-gray-800 cursor-pointer text-2xl mb-2  text-left font-code text-aqua"> 
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
					</svg> 
					{requestInfo.city}
				</h2>
				<h2 className="text-gray-800 cursor-pointer text-1xl mb-2 text-left font-code text-aqua mt-6">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
					</svg>
					 {requestInfo.favoritePLanguage}
				</h2>
				<h2 className="text-gray-800 cursor-pointer text-1xl mb-2 text-left font-code text-aqua">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
					</svg>
					 {requestInfo.biography}
				</h2>
		
			
				</div>
			</div>
		</div>
	</div>



    )
}