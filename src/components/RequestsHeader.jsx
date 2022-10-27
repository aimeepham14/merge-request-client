import { useState } from 'react'

export default function RequestsHeader({currentUser}) {
    return (
        <div>
            <p>{currentUser.firstName}</p>
        </div>
    )
}