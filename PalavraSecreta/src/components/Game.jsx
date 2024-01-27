import { useState, useRef } from "react"
import "./Game.css"

const Game = ({
  verifyLetter, 
  pickedWord, 
  pickedCategory, 
  letters, 
  guessedLetters, 
  wrongLetters, 
  guesses, 
  score
}) => {
    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault()

      verifyLetter(letter)
      setLetter("") //pra limpar o input para poder digitar uma nova letra

      letterInputRef.current.focus() //mantem 'clicado' no input após envio de form
    }

  return (
    <div className="game">

      <div className="top">
        <h3 className="tip">
          Dica: <span>{pickedCategory}</span>
        </h3>
        <h3 className="points">
          <span>Pontuação: {score} </span>
        </h3>
      </div>
          
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>

          
      <div className="wrongLettersContainer">
        <p>Letras ja utilizadas {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
        </p>
        <p>Tentativa(s): {guesses} </p>
      </div>
          

      <div className="letterContainer">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength='1' 
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            placeholder="Digite uma letra"
          />
          <button>Jogar</button>
        </form>
      </div>
        
    </div>
  )
}

export default Game;