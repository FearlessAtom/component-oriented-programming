import { BoardContent } from "../../components";
import styles from "../GamePage/GamePage.module.css";
import { BoardProvider, useBoard, useSettings,  } from "../../providers";

function GamePage() {
    return <div className={styles["board-container"]}>
        <BoardProvider>
            <BoardContent />
        </BoardProvider>
    </div>
}

export default GamePage;
