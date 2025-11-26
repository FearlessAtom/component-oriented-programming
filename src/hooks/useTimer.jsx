import { useEffect, useRef, useState } from "react";

function useTimer() {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef();

    const timer = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60)
        .toString().padStart(2, '0')}`;

    const start = () => {
        intervalRef.current = setInterval(() => {
            setSeconds(previous_value => previous_value + 1);
        }, 1000)
    }

    const stop = () => {
        if(intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const reset = () => {
        stop();
        setSeconds(0);
        start();
    }

    useEffect(() => {
        return () =>  {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, []);

    return {timer, start, stop, reset};
}

export default useTimer;
