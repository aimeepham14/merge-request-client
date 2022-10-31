export default function Modal ({ isVisible, onClose, children }) {
    if ( !isVisible ) return null

    const handleClose = (e) => {
        if(e.target.id === "content") onClose()
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50' id="content" onClick ={handleClose}>
            <div className='w-1/2 flex flex-col'>
                <button className="text-red text-xl place-self-end" onClick = {() => onClose()}> X
                </button>
                <div className="bg-white p-2 rounded"> {children}
                </div>                
            </div>
        </div>
    )
}