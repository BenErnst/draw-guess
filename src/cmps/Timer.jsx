import { memo, useRef } from 'react';
import { useEffectUpdate } from '../hooks/useEffectUpdate';

const _Timer = ({ player, count, setCount, isTimerOn }) => {
    let intervalIdRef = useRef();

    useEffectUpdate(() => {
        if (player.type === 'drawer') return;

        intervalIdRef.current = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isTimerOn]);

    return (
        <div className="timer-container">
            <p>Timer</p>
            <span>{count}</span>
        </div>
    );
};

export const Timer = memo(_Timer);
