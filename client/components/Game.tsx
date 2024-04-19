import { useParams } from "react-router-dom"

function Game() {
  const { id } = useParams()

  return (
    <div>
      <h1>Game</h1>
      <p>Game code: {id}</p>
    </div>
  )
}

export default Game
