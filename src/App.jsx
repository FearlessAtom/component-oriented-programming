import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { HomePage, GamePage, ResultsPage } from "./pages";
import ResultPage from "./pages/ResultPage/ResultPage";

function App() {

    return  <RouterProvider router={ 
        createBrowserRouter(
            createRoutesFromElements(
                <>
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="/game" element={ <GamePage /> } />
                    <Route path="/results" element={ <ResultsPage /> } />
                    <Route path="/results/:resultId" element={ <ResultPage /> } />
                </>
            )
        )
    } />
}

export default App;
