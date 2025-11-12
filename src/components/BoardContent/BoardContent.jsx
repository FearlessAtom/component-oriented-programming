import { useBoard, useSettings } from "../../providers"
import { GameResults, Modal, Portal, ScoreBoard, Card, Board } from "../";

function BoardContent(props)
{
    const board = useBoard();
    const settings = useSettings();

    const cardElements = props.cards.map((card, i) => <Card
        cardImageName={ card }
        key={i}
    />);

    return <>
        <Board>
            { cardElements }

            { settings.isGameGoing && 
                <ScoreBoard />
            }
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

export { BoardContent }
