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
                console.log(response.data)
                setRequestInfo(response.data)
            } catch (err) {
                console.warn(err)
            }
        }
        requestProfile()
    })

    return (
        <div class="min-h-screen bg-gray-700 flex justify-center items-center">
		<div class="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
			<div>
				<h1 class="mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 text-6xl font-code text-orange">{requestInfo.firstName}'s profile</h1>
			</div>
			<img class="w-min cursor-pointer" src={requestInfo.photo}  alt="user profile pic" />
			<div class="flex p-4 justify-between">
				<div class="items-center space-x-2">
					<h2 class="text-gray-800 cursor-pointer text-1xl mb-2  text-left font-code text-orange">{requestInfo.city}</h2>
					<h2 class="text-gray-800 cursor-pointer text-2xl mb-2 text-left font-code text-secondary">{requestInfo.biography}</h2>
					<h2 class="text-gray-800 cursor-pointer text-2xl mb-2 text-left font-code text-secondary">{requestInfo.birthYear} </h2>
					
				</div>
			</div>
		</div>
	</div>
    )
}