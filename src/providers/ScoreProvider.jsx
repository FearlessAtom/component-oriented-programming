import { createContext, useContext, useEffect, useState } from "react";
import { useTimer } from "../hooks";

const ScoreContext = createContext();

function ScoreProvider({ children })
{
    const [moves, setMoves] = useState();
    const [percentage, setPercentage] = useState();
    const { timer, start, stop, reset } = useTimer();

    const resetScore = () => {
        setPercentage(0);
        setMoves(0);
        reset();
    }

    useEffect(() => { resetScore }, []);

    return <ScoreContext.Provider value={{ moves, setMoves, percentage, setPercentage, timer,
        timerStart: start, timerStop: stop, timerReset: reset, resetScore }}>

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
