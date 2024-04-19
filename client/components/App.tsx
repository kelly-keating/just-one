import { Outlet } from "react-router-dom"

import ChatBox from "./ChatBox"

function App () {  
  return (
    <div className="container" >
      <Outlet />

      <div className="content" >
        <h2>The chat</h2>
        <ChatBox />
      </div>
    </div>
  )
}

export default App
