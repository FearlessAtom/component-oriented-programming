import styles from "../GameResults/GameResults.module.css";
import { useNavigate } from "react-router";
import { useGameControl } from "../../hooks";
import { useScoreStore, useSettingsStore, useTimerStore } from "../../stores";
import { formatSeconds } from "../../utils/utils";

function GameResults() {

    const isMoveLimited = useSettingsStore(state => state.isMoveLimited);
    const moveLimit = useSettingsStore(state => state.moveLimit);
    const setIsGameGoing = useSettingsStore(state => state.setIsGameGoing);

    const moves = useScoreStore(state => state.moves);
    const percentage = useScoreStore(state => state.percentage);

    const navigate = useNavigate();

    const { resetGame, startGame } = useGameControl();

    const seconds = useTimerStore(state => state.seconds);

    const goToMainMenu = () => {
        setIsGameGoing(false);
        resetGame();
        navigate("/");
    }

    const restartGame = () => {
        resetGame();
        startGame();
    }

    return <div className={ styles.container }>
        <div className={ styles.game_results}>
            { percentage == 100 ?
                <p className={ styles.title + " " + styles["color-victory"] }>Victory!</p>
                :
                <p className={ styles.title + " " + styles["color-loss"] }>Loss</p>
            }

            <div className={styles["value-container"]}>
                <p className={ styles.label }>Time: </p>
                <p className={ styles.value }>{ formatSeconds(seconds) }</p>
            </div>

            <div className={styles["value-container"]}>
                { isMoveLimited ?
                    <>
                    { percentage != 100 && moveLimit - moves == 0 ?
                        <p className={ styles.value + " " + styles["color-loss"] } >You ran out of moves!</p>
                        :
                        <>
                            <p className={ styles.label }>Moves: </p>
                            <p className={ styles.value }>{ moveLimit - moves } left out of { moveLimit }</p>
                        </>
                    }
                    </>
                    :
                    <>
                        <p className={ styles.label }>Moves: </p>
                        <p className={ styles.value }>{ moves }</p>
                    </>
                }
            </div>

            <div className={styles["value-container"]}>
                <p className={ styles.label }>Percentage: </p>
                <p className={ styles.value }>{ percentage }%</p>
            </div>

            <div className={styles["button-container"]}>
                <button className={ styles.button } onClick={ goToMainMenu }>Main Menu</button>
                <button className={ styles.button } onClick={ restartGame }>Restart</button>
            </div>
        </div>
    </div>
}

export default GameResults;
