export default function AboutMR(){
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    return(
        <div style={{backgroundColor: 'black', color:'white'}}>
            <div>
                <p  className='text-primary text-4xl font-code pt-8' >About Merge Request</p>
                <p className='text-secondary text-2xl font-code bg-[#1C1C1C] pt-8' >Looking for friends? A soulmate? Look no further than Merge Request, an online connection app. We all know software engineers are focused and introverted so we made an application that make it easy to connect with others to help bring them out of their comfort zone. A dating app for developers to develop meaningful relationships.</p>
            </div>
            <div>
                <p className="text-red text-4xl font-code mt-8" >Meet the Team</p>
            </div>
            <div style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                <div style={{margin:'50px'}}>
                    <p>Tyler</p>
                    <img src={'https://upload.wikimedia.org/wikipedia/en/7/7e/Jim-halpert.jpg'} style={{height: '300px'}}></img>
                    <div style={{display: 'flex', alignItems:'', justifyContent: 'center'}}>
                        <img src={'/githublogo.png'} style={{height: '100px'}} onClick={()=> openInNewTab('https://github.com/tylerchan33')}></img>
                        <img src={'linkedinlogo.png'} style={{height: '82px', margin:'9px'}} onClick={()=> openInNewTab('https://www.linkedin.com/in/tylerchan33/')}></img>
                    </div>
                    <p></p>
                </div>
                <div style={{margin:'50px'}}>
                    <p>Aimee</p>
                    <img src={'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Angela_Martin.jpg/220px-Angela_Martin.jpg'} style={{height: '300px'}}></img>
                    <div style={{display: 'flex', alignItems:'', justifyContent: 'center'}}>
                        <img src={'/githublogo.png'} style={{height: '100px'}} onClick={()=> openInNewTab('https://github.com/aimeepham14')}></img>
                        <img src={'linkedinlogo.png'} style={{height: '82px', margin:'9px'}} onClick={()=> openInNewTab('https://www.linkedin.com/in/aimee-pham/')}></img>
                    </div>
                    <p></p>
                </div>
                <div style={{margin:'50px'}}>
                    <p>Stephen</p>
                    <img src={'https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png'} style={{height: '300px'}}></img>
                    <div style={{display: 'flex', alignItems:'', justifyContent: 'center'}}>
                        <img src={'/githublogo.png'} style={{height: '100px'}} onClick={()=> openInNewTab('https://github.com/syorn96')}></img>
                        <img src={'linkedinlogo.png'} style={{height: '82px', margin:'9px'}} onClick={()=> openInNewTab('https://www.linkedin.com/in/stephenyorn/')}></img>
                    </div>
                    <p></p>
                </div>
            </div>
        </div>
    )
}