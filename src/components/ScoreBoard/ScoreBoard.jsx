import { useNavigate } from "react-router";
import { useScore } from "../../providers";
import styles from "../ScoreBoard/ScoreBoard.module.css";
import { useSettingsStore } from "../../stores";

function ScoreBoard()
{
    const {isMoveLimited, moveLimit} = useSettingsStore();

    const score = useScore();
    const navigate = useNavigate();

    return <div className={ styles.container }>
        <div className={ styles["board-container"] }>
            <div className={ styles["value-container"] }>
                <p className={ styles.label }>Timer: </p>
                <p className={ styles.value }>{ score.timer }</p>
            </div>

            <div className={styles["value-container"]}>
                <p className={ styles.label }>Moves: </p>

                {isMoveLimited ?
                    <p className={ styles.value }>{ moveLimit - score.moves } left</p>
                    :
                    <p className={ styles.value }>{ score.moves }</p>
                }
            </div>

            <div className={styles["value-container"]}>
                <p className={ styles.label }>Percentage: </p>
                <p className={ styles.value }>{ score.percentage }%</p>
            </div>
        </div>
        <div className={styles.buttons}>
            <button onClick={ () => navigate("/") }
                className={ styles.buttons + " " + styles["main-menu-button"] }>Main Menu</button>
        </div>
    </div>
}

export default ScoreBoard;
