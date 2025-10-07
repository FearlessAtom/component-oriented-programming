import styles from "../GameResults/GameResults.module.css";

function GameResults()
{
    return <div className={ styles.container }>
        <div className={ styles.game_results}>
            <p className={ styles.game_results_item }>Timer: 00:00:00</p>
            <p className={ styles.game_results_item }>Moves: 0</p>
            <p className={ styles.game_results_item }>Percentage: 0</p>
        </div>
    </div>
}

export { GameResults };
