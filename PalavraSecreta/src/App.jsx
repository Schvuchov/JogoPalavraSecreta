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

const guessesQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    //escolhendo uma categoria aleatoria
    const categories = Object.keys(words) //me da um array com todas as chaves (categorias)
    const category = categories[Math.floor(Math.random() * categories.length)]

    //escolhendo uma palavra aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    
    return {word, category} 
  }, [words])

  //começa o jogo
  const startGame = useCallback(() => {
    //limpando as letras
    clearLetterStates();

    //escolhe a palavra e a categoria
    const { word, category } = pickWordAndCategory()

    //cria um array com as letras da palavra separadas
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //setando os states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

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
    if(letters.includes(normalizedLetter)) {
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
    //o use effect nesse caso vai monitorar as guesses, a função vai ser executada toda vez que guesses for modificada
  useEffect(() => {
    if(guesses <= 0){
      //resetar stage para a prox partida e acabar o jogo
      clearLetterStates();
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //checando condição de vitória 
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)] //Set só deixa itens únicos em um array, vamos usar para que o usuário não precise digitar duas vezes a mesma letra

    //condição de vitória
    if(guessedLetters.length === uniqueLetters.length){
      //add pontuação
      setScore((actualScore) => (actualScore += 100))
      //resetar com uma nova palavra
      startGame();
    }

  }, [guessedLetters, letters, startGame])

  //recomeça o jogo
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }


  return (
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

      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
