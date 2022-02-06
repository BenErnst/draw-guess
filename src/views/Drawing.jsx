import { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToggle } from '../hooks/useToggle';
import { useEffectUpdate } from '../hooks/useEffectUpdate';
import { Canvas } from '../cmps/Canvas';
import { Timer } from '../cmps/Timer';
import { GuesserControls } from '../cmps/GuesserControls';
import { loadGameSessions, setGameData } from '../store/actions/gameActions';
import { savePlayer, switchPlayers } from '../store/actions/playerActions';
import { socketService } from '../services/socketService';

export const Drawing = () => {
    const { currSession } = useSelector((state) => state.gameModule);
    const { player } = useSelector((state) => state.playerModule);
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);
    const [isTimerOn, setIsTimerOn] = useToggle(false);

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const touchEvsRef = useRef(['touchstart', 'touchend', 'touchmove']);
    const colorsRef = useRef(['red', 'green', 'blue', 'black']);

    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            dispatch(loadGameSessions());
        }, 50);

        socketService.on('start drawing', (evPos) => {
            ctxRef.current.beginPath();
            ctxRef.current.moveTo(evPos.x, evPos.y);
        });
        socketService.on('drawing', (data) => {
            ctxRef.current.strokeStyle = data.color;
            ctxRef.current.lineTo(data.pos.x, data.pos.y);
            ctxRef.current.stroke();
        });
        socketService.on('finish drawing', () => {
            ctxRef.current.closePath();
        });

        socketService.on('switch player type', (type) => {
            console.log(`switch player type to ${type}`);
            dispatch(
                savePlayer({
                    id: player.id,
                    name: player.name,
                    type,
                })
            );
        });

        socketService.on('new word chosen', () => {
            console.log('new word chosen');
            setIsTimerOn(true);
            setTimeout(() => {
                dispatch(loadGameSessions());
            }, 100);
        });

        if (!count) setIsTimerOn(true);
    }, []);

    useEffectUpdate(() => {
        if (!canvasRef.current) {
            history.push('/');
            return;
        }

        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctxRef.current = ctx;
    }, [currSession]);

    const setLineColor = (color) => {
        ctxRef.current.strokeStyle = color;
    };

    const startDrawing = (ev) => {
        const evPos = getEvPos(ev);

        socketService.emit('start drawing', evPos);

        ctxRef.current.beginPath();
        ctxRef.current.moveTo(evPos.x, evPos.y);
    };

    const finishDrawing = () => {
        socketService.emit('finish drawing');
        ctxRef.current.closePath();
    };

    const draw = (ev) => {
        if (player.type === 'guesser') return;
        const evPos = getEvPos(ev);

        socketService.emit('drawing', {
            pos: evPos,
            color: ctxRef.current.strokeStyle,
        });

        ctxRef.current.lineTo(evPos.x, evPos.y);
        ctxRef.current.stroke();
    };

    const getEvPos = (ev) => {
        var pos;
        // for Mobile:
        if (touchEvsRef.current.includes(ev.type)) {
            ev.preventDefault();
            ev = ev.changedTouches[0];
            pos = {
                x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
                y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
            };
            //
        } else {
            pos = {
                x: ev.nativeEvent.offsetX,
                y: ev.nativeEvent.offsetY,
            };
        }
        return pos;
    };

    const endGame = (guesser, points) => {
        const ts = Date.now();
        dispatch(setGameData({ guesser, points, count, ts }));
        dispatch(switchPlayers());

        socketService.emit('switch player type', player.type);

        if (player.type === 'guesser') history.push('/word-choosing');
    };

    return currSession && player ? (
        <section className="drawing-container">
            {player.type === 'drawer' && (
                <h1>
                    Your Word: <span>{currSession.word.txt}</span>
                </h1>
            )}

            <div className="canvas-container">
                <Canvas
                    onStartDrawing={startDrawing}
                    onFinishDrawing={finishDrawing}
                    onDraw={draw}
                    touchEvs={touchEvsRef.current}
                    ref={canvasRef}
                />
            </div>

            {player.type === 'drawer' ? (
                <div className="setting-color-container">
                    {colorsRef.current.map((color) => {
                        return (
                            <button
                                onClick={() => setLineColor(color)}
                                style={{ background: color }}
                                key={color}
                            >
                                🖌️
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <GuesserControls guesser={player} word={currSession.word} onEndGame={endGame} />
                    <Timer
                        player={player}
                        count={count}
                        setCount={setCount}
                        isTimerOn={isTimerOn}
                    />
                </div>
            )}
        </section>
    ) : (
        <img src={require(`../assets/img/loading.gif`)} className="loading-gif" />
    );
};
