import "./GameOver.css"

const GameOver = ({retry}) => {
  return (
    <div>
        <h1>gameOver</h1>
        <button onClick={retry}>Recomeçar</button>
    </div>
  )
}

export default GameOver