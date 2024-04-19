import { ChangeEvent, FormEvent, useState } from "react"
import useSocket from "../socket/useSocket"

function ChatBox() {
  const [newMsg, setNewMsg] = useState('')
  const handleChat = (e: FormEvent) => {
    e.preventDefault()
    socket.emit('send message', newMsg)
    setNewMsg('')
  }

  const [messages, setMessages] = useState([] as string[])
  const newMessage = (str: string) => setMessages([str, ...messages])

  const socket = useSocket()
  socket.on('connect', () => newMessage('Welcome to the chat!'))
  socket.on('new member', () => newMessage('New member joined'))
  socket.on('disconnect', () => newMessage('Oops - no chat'))
  socket.on('new message', (msg) => newMessage(msg))
  // TODO: tidy for renders, socket.off - in hook?

  return (
    <div>
      <form onSubmit={handleChat}>
        <label>
          New message:
          <input type='text' value={newMsg} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMsg(e.target.value)} />
        </label>
      </form>
      {messages.map((m, i) => <p key={i}>{m}</p>)}
    </div>
  )
}

export default ChatBox
