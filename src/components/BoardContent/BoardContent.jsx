import { GameResults, Modal, Portal, ScoreBoard, Card, Board } from "../";
import { useBoard } from "../../hooks";
import { useBoardStore, useSettingsStore } from "../../stores";

function BoardContent()
{
    const { flipCard, isFlipped } = useBoard();
    const { cards, isGameResultsModalOpen } = useBoardStore();
    const { isGameGoing } = useSettingsStore();

    const cardElements = cards.map((card, i) => {
        return <Card
            card={card}
            onFlip={() => flipCard(card.cardId)}
            isFlipped={isFlipped(card.cardId)}
            key={i}
        />
    });

    return <>
        <Board>
            { cardElements }

            { isGameGoing && <ScoreBoard /> }
        </Board>

        { isGameResultsModalOpen &&
            <Portal>
                <Modal>
                    <GameResults></GameResults>
                </Modal>
            </Portal>
        }
    </>
}

export default BoardContent;
