import {useState, useEffect} from 'react'

interface Reply {
    reply: string
}

const ChatPage = () => {
    const [currentMessage, setCurrentMessage] = useState<string | null>(null)
    const [aiResponse, setAiResponse] = useState<Reply | null>(null)
    const [chatBoard, setChatBoard] = useState<string[]>([])

    const handleSendMessage = async () => {
        if(!currentMessage) return
         setChatBoard((prev)=>(
        [...prev, currentMessage]
        ))
        try{
            const response = await fetch(import.meta.env.VITE_BACKEND_URL,{
                headers:{
                    'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify({message: currentMessage})
            })
            if(!response.ok){
                alert('error')
            } else {
                const data = await response.json()
                setAiResponse(data)
            }
        } catch (e){
            console.log(e)
        } finally {
            setCurrentMessage(null)
        }
    }

    useEffect(()=>{
        if(aiResponse){
             setChatBoard((prev)=>(
        [...prev, aiResponse.reply]
        ))
        setAiResponse(null)
        }
    },[aiResponse])


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
            width: '100%'
        }}
        >
            {
                chatBoard.length > 0 && (
                    chatBoard.map((message, index)=>(
                        <div
                        key={index}
                        style={{
                            background: 'darkslategray',
                            color: '#f5f5f5'
                        }}
                        >
                            <p
                            >
                                {message}
                            </p>
                        </div>
                    ))
                )
            }
        </div>
        <div
        id='inputContainer'
        style={{
            height: '5%',
            width: '100%',
            background: 'darkslategray'
        }}
        >
            <input 
            type='text'
            onChange={
                (e)=>setCurrentMessage(e.target.value)
            }
            />
            <button
            onClick={handleSendMessage}
            >
                enviar
            </button>
        </div>
    </div>
  )
}

export default ChatPage