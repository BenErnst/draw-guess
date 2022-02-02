import { useToggle } from '../hooks/useToggle';
import { useHistory } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Canvas } from '../cmps/Canvas';
import { useEffectUpdate } from '../hooks/useEffectUpdate';
import { loadGameSessions, setGameData, startNewGame } from '../store/actions/gameActions';
import { switchPlayers } from '../store/actions/playerActions';
import { GuesserControls } from '../cmps/GuesserControls';

export const Drawing = () => {
    const [isDrawing, setIsDrawing] = useToggle(false);
    const history = useHistory();

    const { gameSessions } = useSelector((state) => state.gameModule);
    const { player } = useSelector((state) => state.playerModule);
    const dispatch = useDispatch();

    const wordRef = useRef('');
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    useEffect(() => {
        dispatch(loadGameSessions());
        wordRef.current = gameSessions[gameSessions.length - 1].word;
    }, []);

    useEffectUpdate(() => {
        // console.log('gameSessions:', gameSessions);

        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.strokeStyle = '#2d2d2d';
        ctx.lineWidth = 3;
        ctxRef.current = ctx;
    }, [gameSessions]);

    const startDrawing = (ev) => {
        // const { offsetX, offsetY } = ev.nativeEvent;
        const pos = getEvPos(ev);
        ctxRef.current.beginPath();
        // ctxRef.current.moveTo(offsetX, offsetY);
        ctxRef.current.moveTo(pos.x, pos.y);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (ev) => {
        if (!isDrawing) return;
        // const { offsetX, offsetY } = ev.nativeEvent;
        console.log('draw');
        const pos = getEvPos(ev);
        // ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.lineTo(pos.x, pos.y);
        ctxRef.current.stroke();
    };

    const getEvPos = (ev) => {
        const touchEvs = ['touchstart', 'touchend', 'touchmove'];
        var pos;
        if (touchEvs.includes(ev.type)) {
            console.log(ev.type);
            ev.preventDefault();
            ev = ev.changedTouches[0];
            pos = {
                x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
                y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
            };
        } else {
            pos = {
                x: ev.nativeEvent.offsetX,
                y: ev.nativeEvent.offsetY,
            };
        }
        return pos;
    };

    const endGame = (guesser, points) => {
        dispatch(setGameData(guesser, points));
        dispatch(startNewGame());
        dispatch(switchPlayers());
        if (player.type === 'guesser') history.push('/word-choosing');
    };

    const drawerControls = (
        <div>
            <button onClick={history.goBack}>⬅Words</button>
            <button>Save</button>
        </div>
    );

    return gameSessions.length && player ? (
        <section>
            <h1>Drawing here</h1>
            <h2>{wordRef.current.txt}</h2>
            <div>
                <Canvas
                    onStartDrawing={startDrawing}
                    onFinishDrawing={finishDrawing}
                    onDraw={draw}
                    ref={canvasRef}
                />
            </div>

            {player.type === 'drawer' ? (
                drawerControls
            ) : (
                <GuesserControls guesser={player} word={wordRef.current} onEndGame={endGame} />
            )}
        </section>
    ) : (
        <img src={require(`../assets/img/loading.gif`)} className="loading-gif" />
    );
};
