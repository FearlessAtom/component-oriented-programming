import { Board } from "../../components";
import styles from "../GamePage/GamePage.module.css"

function GamePage()
{
    return <div className={styles.board_container}>
        <Board card_count={ 20 } />
    </div>
}

export default GamePage;
