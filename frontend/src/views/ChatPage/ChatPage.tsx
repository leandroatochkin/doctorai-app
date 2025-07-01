import {useState, useEffect, useRef} from 'react'
import { SyncLoader } from 'react-spinners'
import SendIcon from '../../assets/icons/SendIcon'

interface Reply {
    reply: string
}

const ChatPage = () => {
    const [currentMessage, setCurrentMessage] = useState<string>('')
    const [aiResponse, setAiResponse] = useState<Reply | null>(null)
    const [chatBoard, setChatBoard] = useState<string[]>([])
    const [messageLoading, setMessageLoading] = useState<boolean>(false)

    const handleSendMessage = async () => {
        setMessageLoading(true)
        if(!currentMessage) return
         setChatBoard((prev)=>(
        [...prev, currentMessage]
        ))
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`,{
                headers:{
                    'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify({message: currentMessage})
            })
            setCurrentMessage('')
            if(!response.ok){
                alert('error')
            } else {
                const data = await response.json()
                setAiResponse(data)
            }
        } catch (e){
            console.log(e)
        } finally {
            setCurrentMessage('')
            setMessageLoading(false)
        }
    }

        useEffect(() => {
        function handleEnterKey(event: KeyboardEvent) {
            if (event.key === 'Enter') {
            event.preventDefault()
            handleSendMessage()
            }
        }

        window.addEventListener('keydown', handleEnterKey)

        return () => {
            window.removeEventListener('keydown', handleEnterKey)
        }
        }, [currentMessage])

    useEffect(()=>{
        if(aiResponse){
             setChatBoard((prev)=>(
        [...prev, aiResponse.reply]
        ))
        setAiResponse(null)
        }
    },[aiResponse])

    const chatEndRef = useRef<HTMLDivElement | null>(null);

        // Scroll to bottom whenever chatBoard changes
        useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        }, [chatBoard]);


  return (
    <div
    style={{
        height: '100dvh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: '#f5f5f5'
    }}
    >
        <div
        id='board'
        style={{
            height: '95%',
            width: '100%',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: 2,
            background: `radial-gradient(
            125% 125% at -2% 101%,
            rgba(245, 87, 2, 1) 10.5%,
            rgba(245, 120, 2, 1) 16%,
            rgba(245, 140, 2, 1) 17.5%,
            rgba(245, 170, 100, 1) 25%,
            rgba(238, 174, 202, 1) 40%,
            rgba(202, 179, 214, 1) 65%,
            rgba(148, 201, 233, 1) 100%)`}}
        >
            <>
            <style>
                {`
                @keyframes slideInLeft {
                    from {
                    opacity: 0;
                    transform: translateX(-30px);
                    }
                    to {
                    opacity: 1;
                    transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                    opacity: 0;
                    transform: translateX(30px);
                    }
                    to {
                    opacity: 1;
                    transform: translateX(0);
                    }
                }
                `}
            </style>

            {chatBoard.length > 0 && (
                chatBoard.map((message, index) => {
                const isAiMsg = index % 2;
                return (
                    <div
                    key={index}
                    style={{
                        marginLeft: !isAiMsg ? 2 : 'auto',
                        marginRight: isAiMsg ? 2 : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        flexDirection: isAiMsg ? 'row-reverse' : 'row',
                        animation: `${isAiMsg ? 'slideInRight' : 'slideInLeft'} 0.4s ease`,
                        
                                                        }}
                    >
                    <div
                        style={{
                        height: '50px',
                        width: '50px',
                        borderRadius: '50%',
                        background: '#DEE8FF',
                        boxShadow: `0px 10px 5px 0px rgba(0,0,0,0.75);
                                    -webkit-box-shadow: 0px 10px 5px 0px rgba(0,0,0,0.75);
                                    -moz-box-shadow: 0px 10px 5px 0px rgba(0,0,0,0.75);`
                        }}
                    >
                        
                        <img 
                        src={isAiMsg ? `/doctor.svg` : '/user.svg'} 
                        alt={isAiMsg ? `doctor-photo` : 'user-photo'} 
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                        />

                    </div>

                    <div
                        style={{
                        background: isAiMsg
                            ? 'linear-gradient(270deg, rgba(74, 152, 255, 1) 0%, rgba(87, 165, 199, 1) 50%, rgba(220, 142, 237, 1) 100%)'
                            : 'linear-gradient(90deg, rgba(74, 152, 255, 1) 0%, rgba(87, 165, 199, 1) 50%, rgba(220, 142, 237, 1) 100%)',
                        color: '#f5f5f5',
                        width: 'fit-content',
                        maxWidth: '70%',
                        borderRadius: 4,
                        padding: 0.5,
                        fontWeight: 'medium',
                        boxShadow: `0px 10px 5px 0px rgba(0,0,0,0.75);
                                    -webkit-box-shadow: 0px 10px 5px 0px rgba(0,0,0,0.75);
                                    -moz-box-shadow: 0px 10px 5px 0px rgba(0,0,0,0.75);`
                        }}
                    >
                        <p
                        style={{
                            marginLeft: 20,
                            marginRight: 20,
                        }}
                        >
                        {message}
                        </p>
                    </div>
                    </div>
                );
                })
            )}
            </>

            {
                messageLoading && (
                    <div
                    style={{
                        marginBottom: 0,
                        marginRight: 2,
                        justifyItems: 'end',
                        paddingRight: '20px'
                    }}
                    >
                        <SyncLoader color='#333'/>
                    </div>
                )
            }
        </div>
        <form onSubmit={handleSendMessage}
        style={{
            height: '8%',
            width: '100%',
            background: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            borderTop: '1px solid #ccc'
        }}
        >    
            <input 
            type='text'
            onChange={
                (e)=>setCurrentMessage(e.target.value)
            }
            style={{
                width: '80%',
                height:'70%',
                backgroundColor: '#f5f5f5',
                borderRadius: 4,
                border: '1px solid #ccc',
                color: '#333',
                fontSize: '1rem',
                marginLeft: '5px'
            }}
            />
            <button
            type='submit'
            style={{
                background: 'radial-gradient(circle,rgba(242, 167, 203, 1) 0%, rgba(148, 187, 233, 1) 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <SendIcon />
            </button>
            </form>
        </div>
    
  )
}

export default ChatPage