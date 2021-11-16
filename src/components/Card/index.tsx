import './styles.css'

export interface CardProps {
  src: string;
  id?: number;
  matched?: boolean;
  handleChoice?: Function;
  flipped?: boolean;
  disabled?: boolean;
}

const Card = (card: CardProps) => {

  const handleClick = () => {
    if(!card.disabled) {
      card.handleChoice!(card)
    }
  }

    return (
    <div className="card">
        <div className={card.flipped ? 'flipped' : ''}>
          <img src={card.src} className="front" alt="Card front" />
          <img
            src="/img/cover.png"
            className="back"
            alt="Card back"
            onClick={handleClick} />
        </div>
    </div>
    )
}

export default Card
