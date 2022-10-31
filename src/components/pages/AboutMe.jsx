export default function AboutMe(){
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    return(
        <div className="bg-[#1C1C1C] mx-auto max-w-screen h-screen">
            <div>
                <p  className='text-primary text-4xl font-code pt-8 underline' >About Merge Request</p>
                <p className='text-secondary ml-20 mr-20 text-2xl font-code bg-[#1C1C1C] pt-8' >Looking for friends? A soulmate? Look no further than Merge Request, an online connection app. We all know software engineers are focused and introverted so we made an application that make it easy to connect with others to help bring them out of their comfort zone. A dating app for developers to develop meaningful relationships.</p>
            </div>
            <div>
                <p className="text-primary text-4xl font-code mt-8 underline" >Meet The Team</p>
            </div>
            <div style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                <div className="mt-6 w-fit mx-auto" style={{margin:'50px'}}>
                    <p className="font-code text-2xl mb-3 text-[#FFFFFF]">TYLER</p>
                    <img className="rounded-full w-56 " src={'https://i.imgur.com/we6rSEA.png'} alt="Tyler"></img>
                    <div style={{display: 'flex', alignItems:'', justifyContent: 'center'}}>
                        <img src={'/githublogo.png'} style={{height: '100px'}} onClick={()=> openInNewTab('https://github.com/tylerchan33')} alt="Github logo"></img>
                        <img src={'linkedinlogo.png'} style={{height: '82px', margin:'9px'}} onClick={()=> openInNewTab('https://www.linkedin.com/in/tylerchan33/')} alt="LinkedIn Logo"></img>
                    </div>
                    <p></p>
                </div>
                <div className="mt-6 w-max mx-auto"  style={{margin:'50px'}}>
                    <p className="font-code text-2xl mb-3 text-[#FFFFFF]">AIMEE</p>
                    <img className="rounded-full w-56 " src={'https://i.imgur.com/tpyeZS0.jpg'} alt="Aimee"></img>
                    <div style={{display: 'flex', alignItems:'', justifyContent: 'center'}}>
                        <img src={'/githublogo.png'} style={{height: '100px'}} onClick={()=> openInNewTab('https://github.com/aimeepham14')}  alt="Github logo"></img>
                        <img src={'linkedinlogo.png'} style={{height: '82px', margin:'9px'}} onClick={()=> openInNewTab('https://www.linkedin.com/in/aimee-pham/')} alt="LinkedIn Logo"></img>
                    </div>
                    <p></p>
                </div>
                <div className="mt-6 w-max mx-auto"  style={{margin:'50px'}}>
                    <p className="font-code text-2xl mb-3 text-[#FFFFFF]">STEPHEN</p>
                    <img className="rounded-full w-56 " src={'https://i.imgur.com/NKbIQYl.png'} alt="Stephen"></img>
                    <div style={{display: 'flex', alignItems:'', justifyContent: 'center'}}>
                        <img src={'/githublogo.png'} style={{height: '100px'}} onClick={()=> openInNewTab('https://github.com/syorn96')} alt="Github logo"></img>
                        <img src={'linkedinlogo.png'} style={{height: '82px', margin:'9px'}} onClick={()=> openInNewTab('https://www.linkedin.com/in/stephenyorn/')} alt="LinkedIn Logo"></img>
                    </div>
                    <p></p>
                </div>
            </div>
        </div>
    )
}