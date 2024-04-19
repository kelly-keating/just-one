import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<h1>Home</h1>} />
          <Route path="game/:id" element={<h1>Game</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
})
