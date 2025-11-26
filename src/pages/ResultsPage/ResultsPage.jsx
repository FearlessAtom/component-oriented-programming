import { useNavigate } from "react-router";
import ResultEntry from "../../components/ResultEntry/ResultEntry";
import { useResults } from "../../hooks";
import styles from "../ResultsPage/ResultsPage.module.css";

function ResultsPage() {
    const resultsHook = useResults();
    const navigate = useNavigate();

    const results = resultsHook.getResults();

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
