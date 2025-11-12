import { useEffect } from "react";
import { useScore, useSettings } from "../../providers";
import styles from "../ScoreBoard/ScoreBoard.module.css";

function ScoreBoard()
{
    const score = useScore();
    const settings = useSettings();

    return <div className={ styles.container }>
        <div className={styles["value-container"]}>
            <p className={styles.label}>Timer: </p>
            <p className={styles.value}>{ score.timer }</p>
        </div>

        <div className={styles["value-container"]}>
            <p className={styles.label}>Moves: </p>

            {settings.isMoveLimited ?
                <p className={styles.value}>{ settings.moveLimit - score.moves  } left</p>
                :
                <p className={styles.value}>{ score.moves }</p>
            }
        </div>

        <div className={styles["value-container"]}>
            <p className={styles.label}>Percentage: </p>
            <p className={styles.value}>{ score.percentage }%</p>
        </div>
    </div>
}

export { ScoreBoard };
