import { useParams } from "react-router";
import { useResults } from "../../hooks";
import { Board, Card } from "../../components";
import styles from "../ResultPage/ResultPage.module.css"

function ResultPage() {
    const {resultId} = useParams();

    const results = useResults();
    const result = results.getResult(resultId);

    const cards = result.cards;

    const cardElements = cards.map((card, i) => <Card card={card} isFlipped={true} key={i} />);

    return <div className={styles.container}>
        <Board>{cardElements}</Board>
    </div>
}

export default ResultPage;
