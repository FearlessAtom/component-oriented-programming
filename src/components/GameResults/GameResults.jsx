import { useBoard, useNavigation, useScore, useSettings } from "../../providers";
import styles from "../GameResults/GameResults.module.css";

function GameResults() {
    const score = useScore();
    const settings = useSettings();
    const navigation = useNavigation();
    const board = useBoard();

    return <div className={ styles.container }>
        <div className={ styles.game_results}>
            { score.percentage == 100 ?
                <p className={styles.title + " " + styles["color-victory"]}>Victory!</p>
                :
                <p className={styles.title + " " + styles["color-loss"]}>Loss</p>
            }

            <div className={styles["value-container"]}>
                <p className={styles.label}>Time: </p>
                <p className={styles.value}>{ score.timer }</p>
            </div>

            <div className={styles["value-container"]}>
                {settings.isMoveLimited ?
                    <>
                    {score.percentage != 100 && settings.moveLimit - score.moves == 0 ?
                        <p className={styles.value + " " + styles["color-loss"]} >You ran out of moves!</p>
                        :
                        <>
                            <p className={styles.label}>Moves: </p>
                            <p className={styles.value}>{ settings.moveLimit - score.moves } left out of { settings.moveLimit }</p>
                        </>
                    }
                    </>
                    :
                    <>
                        <p className={styles.label}>Moves: </p>
                        <p className={styles.value}>{ score.moves }</p>
                    </>
                }
            </div>

            <div className={styles["value-container"]}>
                <p className={styles.label}>Percentage: </p>
                <p className={styles.value}>{ score.percentage}%</p>
            </div>

            <div className={styles["button-container"]}>
                <button className={styles.button} onClick={() => navigation.navigate("/")}>Main Menu</button>
                <button className={styles.button} onClick={() => board.startGame()}>Restart</button>
            </div>
        </div>
    </div>
}

export { GameResults };
