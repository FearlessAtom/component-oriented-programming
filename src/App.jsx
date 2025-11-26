import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { HomePage, GamePage, ResultsPage } from "./pages";
import { SettingsProvider, ScoreProvider } from "./providers";

function App()
{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/game" element={ <GamePage /> } />
                <Route path="/results" element={ <ResultsPage /> } />
            </>
        )
    )

    return <SettingsProvider>
        <ScoreProvider>
            <RouterProvider router={ router } />
        </ScoreProvider>
    </SettingsProvider>
}

export default App;
