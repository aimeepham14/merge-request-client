import { useState } from 'react'

export default function RequestsHeader({currentUser}) {
    return (
        <div>
            <p>Chat with other developers, {currentUser.firstName}!</p>
        </div>
    )
}