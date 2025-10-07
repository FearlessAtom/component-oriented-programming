import styles from "../ScoreBoard/ScoreBoard.module.css";

function ScoreBoard()
{
    return <div className={ styles.container }>
        <p>Timer: 0</p>
        <p>Moves: 0</p>
        <p>Percentage: 0</p>
    </div>
}

export { ScoreBoard };
