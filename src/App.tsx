import { useEffect, useState } from 'react'
import './App.css'
import Card, { CardProps } from './components/Card'

const cardImages: Array<CardProps> = [
  {'src': '/img/helmet-1.png', matched: false},
  {'src': '/img/potion-1.png', matched: false},
  {'src': '/img/ring-1.png', matched: false},
  {'src': '/img/scroll-1.png', matched: false},
  {'src': '/img/shield-1.png', matched: false},
  {'src': '/img/sword-1.png', matched: false}
]

function App() {

  const [cards, setCards] = useState<Array<CardProps>>([])
  const [turn, setTurns] = useState<number>(0)
  const [choiceOne, setChoiceOne] = useState<CardProps | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<CardProps | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffleCards)
      setTurns(0)
  }

  const handleChoice = (card: CardProps) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 1000);
      }
    }
  },[choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {
          cards.map(card => (
            <Card
              src={card.src}
              key={card.id}
              handleChoice={() => handleChoice(card)}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))
        }
      </div>
      <p>Turns: {turn}</p>
    </div>
  )
}

export default App
