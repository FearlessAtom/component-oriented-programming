import { Children } from "react";
import styles from "../Board/Board.module.css";

const getGridColumnCount = (cardCount) => {
    let root = Math.floor(Math.sqrt(cardCount));

    while (cardCount % root != 0) {
        root = root - 1;
    }

    return Number(cardCount / root);
}

function Board({ children, cardCount }) {
    cardCount = cardCount ?? Children.count(children);

    const gridColumnCount = getGridColumnCount(cardCount);

    return <div className={styles["board-container"]}>
        <div
            className={ styles.board }
            style={{ gridTemplateColumns: `repeat(${ gridColumnCount }, 1fr)` }}
        >
            { children }
        </div>
    </div>
}

export default Board;
