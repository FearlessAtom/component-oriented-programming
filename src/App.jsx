import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { HomePage, GamePage, ResultsPage } from "./pages";
import { ScoreProvider } from "./providers";
import ResultPage from "./pages/ResultPage/ResultPage";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/game" element={ <GamePage /> } />
                <Route path="/results" element={ <ResultsPage /> } />
                <Route path="/results/:resultId" element={ <ResultPage /> } />
            </>
        )
    );

    return <ScoreProvider>
        <RouterProvider router={ router } />
    </ScoreProvider>
}

export default App;
