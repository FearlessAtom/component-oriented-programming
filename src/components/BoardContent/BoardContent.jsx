import { useBoard, useSettings } from "../../providers"
import { GameResults, Modal, Portal, ScoreBoard, Card, Board } from "../";

function BoardContent()
{
    const board = useBoard();
    const settings = useSettings();

    const cards = board.cards;

    const cardElements = cards.map((card, i) => {
        return <Card
            card={card}
            onFlip={() => board.flipCard(card.cardId)}
            isFlipped={board.isFlipped(card.cardId)}
            key={i}
        />
    });

    return <>
        <Board>
            {cardElements}

            {settings.isGameGoing && <ScoreBoard />}
        </Board>

        {board.isGameResultsModalOpen &&
            <Portal>
                <Modal>
                    <GameResults></GameResults>
                </Modal>
            </Portal>
        }
    </>
}

export default BoardContent;
