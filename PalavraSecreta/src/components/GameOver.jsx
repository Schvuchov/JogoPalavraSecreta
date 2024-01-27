import "./GameOver.css"

const GameOver = ({retry, score}) => {
  return (
    <div className="over"> 
        <h1>Oh não, você perdeu !</h1>
        <h2>Pontuação total: <span>{score}</span> </h2>
        <button onClick={retry}>Recomeçar</button>
    </div>
  )
}

export default GameOver;