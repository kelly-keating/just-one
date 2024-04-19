import { createContext, ReactElement, useEffect } from 'react'
import io from 'socket.io-client'

const url = process.env.NODE_ENV === 'production'
  ? 'http://socket-chat.devacademy.nz/'
  : 'http://localhost:3000'

const socket = io(url)
export const SocketContext = createContext(socket)

interface ProviderProps {
  children: ReactElement
}

export const SocketProvider = (props: ProviderProps) => (
  <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
)
