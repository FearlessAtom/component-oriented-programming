import "./App.css";
import { useState } from "react";
import { HomePage, GamePage, ResultsPage } from "./pages";
import { SettingsProvider, ScoreProvider } from "./providers";

function App()
{
    const [currentPath, setCurrentPath] = useState("/");

    //useEffect(() => setCurrentPath("/game"), []);

    const navigate = (path) =>
    {
        window.history.pushState({}, "", path);
        setCurrentPath(path);
    }

    return <SettingsProvider>
        <ScoreProvider>
            { currentPath == "/" && <HomePage navigate={ navigate } /> }
            { currentPath == "/game" && <GamePage /> }
            { currentPath == "/results" && <ResultsPage /> }
        </ScoreProvider>
    </SettingsProvider>
}

export default App
