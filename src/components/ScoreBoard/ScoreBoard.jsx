import { useNavigate } from "react-router";
import styles from "../ScoreBoard/ScoreBoard.module.css";
import { useScoreStore, useSettingsStore, useTimerStore } from "../../stores";
import { formatSeconds } from "../../utils/utils";

function ScoreBoard()
{
    const { moveLimit, isMoveLimited } = useSettingsStore(state => state.settingsSnapshot);

    const moves = useScoreStore(state => state.moves);
    const percentage = useScoreStore(state => state.percentage);

    const seconds = useTimerStore(state => state.seconds);

    const navigate = useNavigate();

    return <div className={ styles.container }>
        <div className={ styles["board-container"] }>
            <div className={ styles["value-container"] }>
                <p className={ styles.label }>Timer: </p>
                <p className={ styles.value }>{ formatSeconds(seconds) }</p>
            </div>

            <div className={styles["value-container"]}>
                <p className={ styles.label }>Moves: </p>

                { isMoveLimited ?
                    <p className={ styles.value }>{ moveLimit - moves } left</p>
                    :
                    <p className={ styles.value }>{ moves }</p>
                }
            </div>

            <div className={styles["value-container"]}>
                <p className={ styles.label }>Percentage: </p>
                <p className={ styles.value }>{ percentage }%</p>
            </div>
        </div>
        <div className={styles.buttons}>
            <button onClick={ () => navigate("/") }
                className={ styles.buttons + " " + styles["main-menu-button"] }>Main Menu</button>
        </div>
    </div>
}

export default ScoreBoard;
