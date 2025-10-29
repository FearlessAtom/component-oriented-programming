import "./App.css";
import { HomePage, GamePage, ResultsPage } from "./pages";
import { SettingsProvider, ScoreProvider, NavigationProvider, useNavigation } from "./providers";

function App()
{
    return <NavigationProvider>
        <SettingsProvider>
            <ScoreProvider>
                <RouterComponents />
            </ScoreProvider>
        </SettingsProvider>
    </NavigationProvider>
}

function RouterComponents()
{
    const { currentPath } = useNavigation();
    
    return (
        <>
            { currentPath === "/" && <HomePage /> }
            { currentPath === "/game" && <GamePage /> }
            { currentPath === "/results" && <ResultsPage /> }
        </>
    );
}

export default App;
