import { BoardContent } from "../../components";
import styles from "../GamePage/GamePage.module.css";

function GamePage() {
    return <div className={styles["board-container"]}>
        <BoardContent />
    </div>
}

export default GamePage;
