import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { HomePage, GamePage, ResultsPage, ResultPage } from "./pages";
import { CookiePopup } from "./components";

function App() {
    return <>
        <CookiePopup />

        <RouterProvider router={
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
    </>
}

export default App;
