import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SocketProvider } from './socket/SocketProvider'

import App from './components/App'
import Home from './components/Home'
import Game from './components/Game'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <SocketProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="game/:id" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </SocketProvider>
  )
})
