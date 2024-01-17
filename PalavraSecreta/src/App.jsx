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
    setLetters(letters)

    setGameStage(stages[1].name)
  }

  //processa a letra??
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //recomeça o jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }


  return (
    <>
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
    </>
  )
}

export default App
