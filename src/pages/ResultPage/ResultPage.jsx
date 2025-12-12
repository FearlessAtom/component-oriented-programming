import { useParams } from "react-router";
import { Board, Card } from "../../components";
import styles from "../ResultPage/ResultPage.module.css"
import useResultsStore from "../../stores/resultsStore";

function ResultPage() {
    const { resultId } = useParams();

    const findResultById = useResultsStore(state => state.findResultById);

    const result = findResultById(resultId);

    const cards = result ? result.cards : [];

    const cardElements = cards.map((card, i) => <Card card={ card } isFlipped={ true } key={ i } />);

    return <div className={ styles.container }>
        <Board>{ cardElements }</Board>
    </div>
}

export default ResultPage;
