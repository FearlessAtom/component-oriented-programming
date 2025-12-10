import { useNavigate } from "react-router";
import ResultEntry from "../../components/ResultEntry/ResultEntry";
import styles from "../ResultsPage/ResultsPage.module.css";
import { useResultsStore } from "../../stores";

function ResultsPage() {
    const navigate = useNavigate();

    const results = useResultsStore(state => state.results);

    let resultEntries = results.map((result, index) => {
        return <ResultEntry onClick={() => navigate("/results/" + result.id)}
            result={result} index={index + 1} key={result.id}></ResultEntry>
    });

    resultEntries = resultEntries.reverse();

    return <div className={styles["container"]}>
        {resultEntries}
    </div>
}

export default ResultsPage;
