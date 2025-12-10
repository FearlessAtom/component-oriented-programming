import { useSettingsStore } from "../../stores";
import styles from "../Board/Board.module.css";

const getGridColumnCount = (cardCount) => {
    let root = Math.floor(Math.sqrt(cardCount));

    while (cardCount % root != 0) {
        root = root - 1;
    }

    return Number(cardCount / root);
}

function Board({ children }) {
    const cardCount = useSettingsStore(state => state.cardCount);

    const gridColumnCount = getGridColumnCount(cardCount);

    return <div className={styles.board} style={{ gridTemplateColumns: `repeat(${gridColumnCount}, 1fr)` }}>
        {children}
    </div>
}

export default Board;
