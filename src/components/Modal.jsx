export default function Modal () {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-[600px]'>
                <button className="text-white text-xl"> X
                </button>
                <div>
                </div>                
            </div>
        </div>
    )
}