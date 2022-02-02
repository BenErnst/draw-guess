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

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
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
