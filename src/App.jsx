import "./App.css";
import { useState } from "react";
import { HomePage, GamePage, ResultsPage} from "./pages";

function App()
{
    const [currentPath, setCurrentPath] = useState("/");

    const navigate = (path) =>
    {
        window.history.pushState({}, "", path);
        setCurrentPath(path);
    }

    return <>
        <nav className="navbar">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/game")}>Game</button>
            <button onClick={() => navigate("/results")}>Resuls</button>
        </nav>

        { currentPath == "/" && <HomePage navigate={ navigate } /> }
        { currentPath == "/game" && <GamePage /> }
        { currentPath == "/results" && <ResultsPage /> }
    </>
}

export default App
