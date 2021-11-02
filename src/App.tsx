import { useState } from 'react'
import './App.css'

interface Card {
  src: string
}

const cardImages: Array<Card> = [
  {'src': '/img/helmet-1.png'},
  {'src': '/img/potion-1.png'},
  {'src': '/img/ring-1.png'},
  {'src': '/img/scroll-1.png'},
  {'src': '/img/shield-1.png'},
  {'src': '/img/sword-1.png'}
]

function App() {

  const [cards, setCards] = useState<Array<Card>>([])
  const [turn, setTurns] = useState<number>(0)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setCards(shuffleCards)
      setTurns(0)
  }

  console.log(cards, turn)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  )
}

export default App
