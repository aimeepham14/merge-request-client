import { useState } from 'react'

export default function RequestsHeader({currentUser}) {
    return (
        <div>
            <p className='text-secondary text-4xl font-code bg-[#1C1C1C] pt-8' >Start chatting with other developers, {currentUser.firstName}!</p>
        </div>
    )
}