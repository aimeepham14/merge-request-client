import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'

export default function Chat({sortedMessages, currentUser, selectedUser}) {
    const navigate = useNavigate()
    const profileLink = [<Link className="font-medium font-code text-yellow hover:underline" to={`/requests/${selectedUser._id}`}>Check out {selectedUser.firstName}'s profile here</Link>] 
    const displayMessages = sortedMessages.map((message,i) => {
        const timePosted = new Date(message.timestamp)
        const time = timePosted.toLocaleString()
        return (
            <div key={`${i}`}>
                <div>
                    {/* HI AIMEE IF IT HELPS THIS CONDITIONAL CHANGES THE CLASS NAME IF THE MESSAGE IS FROM ANOTHER USER, IT DEFAULTS TO 'left'*/}
                    <div className={`${(message.name==selectedUser.firstName) ? 'right' : 'left'}`}>
                        <img src={message.img_url} style={{height: 100}}></img>
                    </div>
                    <p>{message.name}</p>
                </div>
                <p>{message.content} sent: {time}</p>
            </div>
        )
    })
    return (
       <div className="bg-[#1C1C1C]">
        {!selectedUser._id ? <p></p> : profileLink}
        {displayMessages}
       </div>
    )
}



{/* <div class="h-screen bg-gray-300">
	
	<div class="flex justify-center items-center h-screen ">
		
		<div class="w-80 h-96 bg-white rounded shadow-2xl">


			<div class="overflow-auto px-1 py-1" style="height: 19rem;" id="journal-scroll">

				<div class="flex items-center pr-10">
					<img src="https://i.imgur.com/IAgGUYF.jpg" class="rounded-full shadow-xl" width="15" height="15" style="box-shadow: "/>
					<span class="flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end" style="font-size: 10px;">Hi Dr.Hendrikson, I haven't been feeling well for past few days. <span class="text-gray-400 pl-1" style="font-size: 8px;">01:25am</span></span>
					
				</div>


				<div class="flex justify-end pt-2 pl-10">
					<span class="bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end " style="font-size: 10px;">Lets jump on a video call. <span class="text-gray-400 pl-1" style="font-size: 8px;">02.30am</span></span>

				</div>


				<div class="flex justify-center">
					<span class="text-gray-500 text-xs pt-4" style="font-size: 8px;">Call started at 02:33 am</span>
				</div>
			
			</div>


			<div class="flex justify-between items-center p-1 ">
				<div class="relative">
					<i class="mdi mdi-emoticon-excited-outline absolute top-1 left-1 text-gray-400" style="font-size: 17px !important;font-weight: bold;"></i>
				<input type="text" class="rounded-full pl-6 pr-12 py-2 focus:outline-none  h-auto placeholder-gray-100 bg-gray-900 text-white" style="font-size: 11px;width: 250px;" placeholder="Type a message..." id="typemsg"/>
				</div>
				<div class="w-7 h-7 rounded-full bg-blue-300 text-center items-center flex justify-center">
					<button class="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-gray-900 hover:text-white" onclick="sendbtn();"><i class="mdi mdi-send "></i></button>
				</div>
				
			</div>
			
			
		</div>

	</div>

</div> */}