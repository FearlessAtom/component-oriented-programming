import "./App.css";
import { HomePage, GamePage } from "./pages";
import { SettingsProvider, ScoreProvider, NavigationProvider, useNavigation, BoardProvider } from "./providers";

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
        </>
    );
}

export default App;
