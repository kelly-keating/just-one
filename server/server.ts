import { join } from 'node:path'
import express from 'express'

const http = require('http')
const sockets = require('socket.io')

const expressServer = express()

expressServer.use(express.static(join(__dirname, 'public')))

expressServer.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

/*
  SOCKETS
    socket - goes back to the same client
    io - goes to all clients

    .emit - sends event
    .join(some string) - socket joins a "room" with other sockets if they use the same string
    .to(socket.id) - sends to a specific client (maybe not this one)
    .to(room) - sends to all in a room
    socket.broadcast.emit - sending to all clients except sender

    io.emit('welcome')
    io.to(socket.id).emit('sup')
    socket.emit('hi')
    socket.broadcast.emit('member left room', socket.id)
    io.to(room).emit('new lobby member', socket.name)
    socket.join('cool room')

    io.in(room).clients((err, clients) => {})
    socket.name = 'Lana'
*/

const fullServer = http.Server(expressServer)
const io = sockets(fullServer)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
io.on('connection', (socket: any) => {
  console.log('socket connected:', socket.id)
  socket.broadcast.emit('new member')

  socket.on('send message', (theVeryImportantMessage: string) => {
    io.emit('new message', theVeryImportantMessage)
  })

  socket.on('set name', (name: string) => {
      socket.name = name
      console.log(`set ${socket.id}'s name to ${name}`)
  })

  socket.on('disconnect', () => {
      console.log('user disconnected')
      socket.broadcast.emit('user left', socket.id)
  })
})

export default fullServer
