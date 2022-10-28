import { useParams } from 'react-router-dom'

export default function RequestsProfile(props){
    const { requestId } = useParams()
    return (
        <div>
            The requests profile
        </div>
    )
}