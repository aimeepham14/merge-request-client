import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'


export default function Chat({sortedMessages, currentUser, selectedUser}) {
    const navigate = useNavigate()
    const profileLink = [<Link className="font-medium text-2xl font-code text-primary hover:underline" to={`/requests/${selectedUser._id}`}>Check out {selectedUser.firstName}'s profile here</Link>] 
    const displayMessages = sortedMessages.map((message,i) => {
        const timePosted = new Date(message.timestamp)
        const time = timePosted.toLocaleString()
        return (
            <div key={`${i}`}>
                <div>
                    {/* HI AIMEE IF IT HELPS THIS CONDITIONAL CHANGES THE CLASS NAME IF THE MESSAGE IS FROM ANOTHER USER, IT DEFAULTS TO 'left'*/}
                    <div className= {`${(message.name==selectedUser.firstName) ? 'right' : 'left'}`}>
                        <img className="rounded-full shadow-xl w-20 h-20" src={message.img_url}></img>
                    {/* <span className="flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end">{message.name}</span> */}
                    {/* <span className="flex ml-1 text-2xl h-auto text-aqua font-code rounded-sm px-1 p-1 items-end">{message.name}</span> */}
                    <span className="flex ml-1 text-2xl h-auto text-aqua font-code rounded-sm px-1 p-1 items-end">{message.content}<span className="text-[#8a8a8a] pl-1 text-sm" >{time}</span></span>
                    </div>
                </div>
                {/* <p>{message.content} sent: {time}</p> */}
            </div>

            
        )
    })
    return (
       <div className="bg-[#cecece]">
        {!selectedUser._id ? <p></p> : profileLink}
        {displayMessages}
       </div>
    )
}



{/* <div class="h-screen bg-gray-300">
	
	<div class="flex justify-center items-center h-screen ">
		
		<div class="w-80 h-96 bg-white rounded shadow-2xl">


			<div class="overflow-auto px-1 py-1" style="height: 19rem;" id="journal-scroll">

				<div class="flex items-center pr-10 {`${(message.name==selectedUser.firstName) ? 'right' : 'left'}`} ">
					<img src={message.img_url} class="rounded-full shadow-xl" width="15" height="15" style="box-shadow: "/>
					<span class="flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end" style="font-size: 10px;">{message.content} 
                    <span class="text-gray-400 pl-1" style="font-size: 8px;">{time}</span></span>
					
				</div>


				<div class="flex justify-end pt-2 pl-10">
					<span class="bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end " style="font-size: 10px;">Lets jump on a video call. <span class="text-gray-400 pl-1" style="font-size: 8px;">02.30am</span></span>

				</div>
			
			</div>
			
			
		</div>

	</div>

</div>  */}


<body>
  <section class="chatbox">
    <section class="chat-window">
      <article class="msg-container msg-remote" id="msg-0">
        <div class="msg-box">
          <img class="user-img" id="user-0" src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro" />
          <div class="flr">
            <div class="messages">
              <p class="msg" id="msg-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius, neque non tristique tincidunt, mauris nunc efficitur erat, elementum semper justo odio id nisi.
              </p>
            </div>
            <span class="timestamp"><span class="username">Name</span>&bull;<span class="posttime">3 minutes ago</span></span>
          </div>
        </div>
      </article>
      <article class="msg-container msg-self" id="msg-0">
        <div class="msg-box">
          <div class="flr">
            <div class="messages">
              <p class="msg" id="msg-1">
                Lorem ipsum dolor sit amet
              </p>
              <p class="msg" id="msg-2">
                Praesent varius
              </p>
            </div>
            <span class="timestamp"><span class="username">Name</span>&bull;<span class="posttime">2 minutes ago</span></span>
          </div>
          <img class="user-img" id="user-0" src="//gravatar.com/avatar/56234674574535734573000000000001?d=retro" />
        </div>
      </article>
      <article class="msg-container msg-remote" id="msg-0">
        <div class="msg-box">
          <img class="user-img" id="user-0" src="//gravatar.com/avatar/002464562345234523523568978962?d=retro" />
          <div class="flr">
            <div class="messages">
              <p class="msg" id="msg-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <span class="timestamp"><span class="username">Name</span>&bull;<span class="posttime">1 minute ago</span></span>
          </div>
        </div>
      </article>
      <article class="msg-container msg-remote" id="msg-0">
        <div class="msg-box">
          <img class="user-img" id="user-0" src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro" />
          <div class="flr">
            <div class="messages">
              <p class="msg" id="msg-0">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <span class="timestamp"><span class="username">Name</span>&bull;<span class="posttime">Now</span></span>
          </div>
        </div>
      </article>
      <article class="msg-container msg-self" id="msg-0">
        <div class="msg-box">
          <div class="flr">
            <div class="messages">
              <p class="msg" id="msg-1">
                Lorem ipsum
              </p>
            </div>
            <span class="timestamp"><span class="username">Name</span>&bull;<span class="posttime">Now</span></span>
          </div>
          <img class="user-img" id="user-0" src="//gravatar.com/avatar/56234674574535734573000000000001?d=retro" />
        </div>
      </article>
    </section>
    <form class="chat-input" onsubmit="return false;">
      <input type="text" autocomplete="on" placeholder="Type a message" />
      <button>
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,.38)" d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" /></svg>
                </button>
    </form>
  </section>
</body>

