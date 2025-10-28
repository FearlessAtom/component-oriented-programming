import { useEffect, useRef, useState } from "react";

function useTimer()
{
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef();

    const timer = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60)
        .toString().padStart(2, '0')}`;

    const start = () => 
    {
        if (isRunning) false;

        setIsRunning(true);

        intervalRef.current = setInterval(() =>
        {
            setSeconds(previous_value => previous_value + 1);
        }, 1000)
    }

    const stop = () => 
    {
        setIsRunning(false);

        if(intervalRef.current)
        {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const reset = () => 
    {
        stop();
        setSeconds(0);
    }

    useEffect(() =>
    {
        return () => 
        {
            if (intervalRef.current)
            {
                clearInterval(intervalRef.current);
            }
        }
    }, []);

    return { timer, start, stop, reset };
}

export { useTimer }
