// CSS
import './App.css'

//React
import { useCallback, useEffect, useState } from 'react'

//data
import { wordsList } from "./data/words"

//components
import StartScreen from './components/StartScreen'
import GameOver from './components/GameOver'
import Game from './components/Game'

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("")

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //escolhendo uma categoria aleatoria
    const categories = Object.keys(words) //me da um array com todas as chaves (categorias)
    const category = categories[Math.floor(Math.random() * categories.length)]
    console.log(category)

    //escolhendo uma palavra aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)
    
    return {word, category} 
  }

  //começa o jogo
  const startGame = () => {
    //escolhe a palavra e a categoria
    const { word, category } = pickWordAndCategory()
    console.log(word, category)

    //cria um array com as letras da palavra separadas
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    console.log(wordLetters)

    //setando os states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  //processa a letra
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //checando se a letra ja foi usada
    if(
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // add palpites ou remove tentativas
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter,])
    }else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter,])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //para quando as tentativas chegarem a 0
    //o use effect nesse caso vai monitorar as guesses
  useEffect(() => {
    if(guesses <= 0){
      //resetar stage para a prox partida e acabar o jogo
      clearLetterStates
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //recomeça o jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }


  return (
    <>
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
    </>
  )
}

export default App
