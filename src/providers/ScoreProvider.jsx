import { createContext, useContext, useState } from "react";
import { useTimer } from "../hooks";

const ScoreContext = createContext();

function ScoreProvider({ children })
{
    const [moves, setMoves] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const { timer, start, stop, reset } = useTimer();

    return <ScoreContext.Provider value={{ moves, setMoves, percentage, setPercentage, timer,
        timerStart: start, timerStop: stop, timerReset: reset }}>

        { children }
    </ScoreContext.Provider>
}

function useScore()
{
    const context = useContext(ScoreContext);

    if (!context)
    {
        throw new Error('useScore must be used within ScoreProvider');
    }

    return context;
}

export { ScoreProvider, useScore }
