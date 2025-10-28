import { useScore } from "../../providers";
import styles from "../GameResults/GameResults.module.css";

function GameResults()
{
    const score = useScore();

    return <div className={ styles.container }>
        <div className={ styles.game_results}>
            <p className={ styles.game_results_item }>Time: { score.timer }</p>
            <p className={ styles.game_results_item }>Moves: { score.moves }</p>
            <p className={ styles.game_results_item }>Percentage: 0</p>
        </div>
    </div>
}

export { GameResults };
