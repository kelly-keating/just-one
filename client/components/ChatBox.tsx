import { ChangeEvent, FormEvent, useState } from "react"
import { Socket } from "socket.io-client"

interface Props {
  socket: Socket
}

function ChatBox({ socket }: Props) {
  const [msg, setMsg] = useState('')

  const handleChat = (e: FormEvent) => {
    e.preventDefault()
    socket.emit('send message', msg)
    setMsg('')
  }

  return (
    <div>
      <form onSubmit={handleChat}>
        <label>
          New message:
          <input type='text' value={msg} onChange={(e: ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)} />
        </label>
      </form>
    </div>
  )
}

export default ChatBox
