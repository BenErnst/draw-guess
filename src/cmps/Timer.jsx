import { memo, useRef, useEffect } from 'react';
import { useEffectUpdate } from '../hooks/useEffectUpdate';

const _Timer = ({ player, count, setCount, isTimerOn }) => {
    // const [count, setCount] = useState(0);
    let intervalIdRef = useRef();

    useEffectUpdate(() => {
        if (player.type === 'drawer') return;

        intervalIdRef.current = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

        // const resetTimer = () => {
        //     clearInterval(intervalIdRef.current);
        //     setCount(0);
        // };

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isTimerOn]);

    // clearInterval(intervalIdRef.current);
    // setCount(0);

    return (
        <div>
            <p>Count: {count}</p>
        </div>
    );
};

export const Timer = memo(_Timer);
