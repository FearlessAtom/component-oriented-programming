import styles from "../GameResults/GameResults.module.css";
import { useNavigate } from "react-router";
import { useScore } from "../../providers";
import { useGameControl } from "../../hooks";
import { useSettingsStore } from "../../stores";

function GameResults() {
    const score = useScore();
    const navigate = useNavigate();

    const { isMoveLimited, moveLimit } = useSettingsStore();
    const { startGame } = useGameControl({ score });

    const goToMainMenu = () => {
        score.resetScore();
        navigate("/");
    };

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
                {isMoveLimited ?
                    <>
                    {score.percentage != 100 && moveLimit - score.moves == 0 ?
                        <p className={styles.value + " " + styles["color-loss"]} >You ran out of moves!</p>
                        :
                        <>
                            <p className={styles.label}>Moves: </p>
                            <p className={styles.value}>{ moveLimit - score.moves } left out of { moveLimit }</p>
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
                <button className={styles.button} onClick={goToMainMenu}>Main Menu</button>
                <button className={styles.button} onClick={startGame}>Restart</button>
            </div>
        </div>
    </div>
}

export default GameResults;
