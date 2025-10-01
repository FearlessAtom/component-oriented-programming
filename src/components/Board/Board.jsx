import { Card }  from "../Card/Card"
import styles from "../Board/Board.module.css";

function Board({ card_count })
{
    let cards = [];

    for (let i = 0; i < card_count; i++)
    {
        cards.push({ id: i });
    }

    cards = cards.map(card => <Card key={card.id} />);

    return <div className={ styles.board }>
        { cards }
    </div>
}

export { Board };
