import { useEffect } from "react";
import { useScore } from "../../providers";
import styles from "../ScoreBoard/ScoreBoard.module.css";

function ScoreBoard()
{
    const score = useScore();

    useEffect(() => 
    {
        score.start();

        return () =>
        {
            score.stop();
        };
    }, [score]);

    return <div className={ styles.container }>
        <p>Timer: { score.timer }</p>
        <p>Moves: { score.moves }</p>
        <p>Percentage: { score.percentage }</p>
    </div>
}

export { ScoreBoard };
