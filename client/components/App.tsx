import { useState } from "react"
import io from 'socket.io-client'

import ChatBox from "./ChatBox"
import { Outlet } from "react-router-dom"

const url = 'http://localhost:3000'
// const url = 'http://socket-chat.devacademy.nz/'

const socket = io(url)

function App () {
  const [messages, setMessages] = useState([] as string[])
  const newMessage = (str: string) => setMessages([str, ...messages])

  socket.on('connect', () => newMessage('Welcome to the chat!'))
  socket.on('new member', () => newMessage('New member joined'))
  socket.on('disconnect', () => newMessage('Oops - no chat'))

  socket.on('new message', (msg) => newMessage(msg))

  return (
    <div className="container" >
      <Outlet />

      <div className="content" >
        <h2>The chat</h2>
        <ChatBox socket={socket} />
        {messages.map((m, i) => <p key={i}>{m}</p>)}
      </div>
    </div>
  )
}

export default App
