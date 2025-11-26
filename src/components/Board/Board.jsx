import { useSettings } from "../../providers";
import styles from "../Board/Board.module.css";

const getGridColumnCount = (cardCount) => {
    let root = Math.floor(Math.sqrt(cardCount));

    while (cardCount % root != 0) {
        root = root - 1;
    }

    return Number(cardCount / root);
}


function Board({ children }) {
    const settings = useSettings();
    
    const gridColumnCount = getGridColumnCount(settings.cardCount);

    return (
        <div  className={styles.board} style={{ gridTemplateColumns: `repeat(${gridColumnCount}, 1fr)` }}> 
            {children}
        </div>
    );
}

export default Board;
