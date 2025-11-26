import { useBoard, useSettings } from "../../providers"
import { GameResults, Modal, Portal, ScoreBoard, Card, Board } from "../";

function BoardContent()
{
    const board = useBoard();
    const settings = useSettings();

    const cardElements = board.cards.map((card, i) => <Card card={card} key={i} />);

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
