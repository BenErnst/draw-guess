import { useToggle } from '../hooks/useToggle';
import { useHistory } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Canvas } from '../cmps/Canvas';
import { useEffectUpdate } from '../hooks/useEffectUpdate';
import {
    loadGameSessions,
    setGameData,
    startNewGame,
    saveArt,
    loadArt,
} from '../store/actions/gameActions';
import { switchPlayers } from '../store/actions/playerActions';
import { GuesserControls } from '../cmps/GuesserControls';
import { canvasService } from '../services/canvasService.js';

export const Drawing = () => {
    // const [isDrawing, setIsDrawing] = useToggle(false);
    const history = useHistory();

    const { gameSessions } = useSelector((state) => state.gameModule);
    const { player } = useSelector((state) => state.playerModule);
    const dispatch = useDispatch();

    const wordRef = useRef('');
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    // const centerRef = useRef(null);
    const touchEvsRef = useRef(['touchstart', 'touchend', 'touchmove']);

    // const [circle, setCircle] = useState(null);
    // const [startPos, setStartPos] = useState(null);

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

        // renderArt(ctxRef.current, canvas);

        // centerRef.current = canvasService.getCenter(canvas);
        // const circle = canvasService.getCircle(centerRef.current);
        // setCircle(circle);
        // renderCircle();
    }, [gameSessions]);

    // const renderCircle = () => {
    //     if (!circle) return;
    //     // console.log('🚀 ~ file: Drawing.jsx ~ line 54 ~ renderCircle ~ circle', circle);
    //     const { pos, color, size } = circle;
    //     ctxRef.current.beginPath();
    //     ctxRef.current.lineWidth = '6';
    //     ctxRef.current.arc(pos.x, pos.y, size, 0, 2 * Math.PI);
    //     ctxRef.current.strokeStyle = 'black';
    //     ctxRef.current.stroke();
    //     ctxRef.current.fillStyle = color;
    //     ctxRef.current.fill();
    // };

    const startDrawing = (ev) => {
        // const { offsetX, offsetY } = ev.nativeEvent;

        const evPos = getEvPos(ev);
        // if (!circle) return;
        // const isCircleClicked = canvasService.isCircleClicked(evPos, circle);
        // if (!isCircleClicked) return;
        // setStartPos(evPos);

        ctxRef.current.beginPath();
        // ctxRef.current.moveTo(offsetX, offsetY);
        ctxRef.current.moveTo(evPos.x, evPos.y);
        // setIsDrawing(true);
    };

    const finishDrawing = () => {
        ctxRef.current.closePath();
        // setIsDrawing(false);
    };

    const draw = (ev) => {
        if (player.type === 'guesser') return;
        // if (!isDrawing) return;
        // const { offsetX, offsetY } = ev.nativeEvent;
        // console.log('draw');
        const evPos = getEvPos(ev);
        // ctxRef.current.lineTo(offsetX, offsetY);

        // const dx = evPos.x - startPos.x;
        // const dy = evPos.y - startPos.y;

        // setStartPos(evPos);

        // const circle = canvasService.getCircle(startPos);
        // circle.pos.x += dx;
        // circle.pos.y += dy;
        // setCircle(circle);

        // Render Canvas:
        // ctxRef.current.save();
        // ctxRef.current.fillStyle = 'lightgray';
        // ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.lineTo(evPos.x, evPos.y);
        ctxRef.current.stroke();
        // renderCircle();
        // ctxRef.current.restore();
        //

        // ctxRef.current.lineTo(evPos.x, evPos.y);
        // ctxRef.current.stroke();

        // ctxRef.current.restore();
    };

    const getEvPos = (ev) => {
        // const touchEvs = ['touchstart', 'touchend', 'touchmove'];
        var pos;
        if (touchEvsRef.current.includes(ev.type)) {
            ev.preventDefault();
            // console.log(ev.type);
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

    const onSaveArt = () => {
        var dataURL = canvasRef.current.toDataURL();
        dispatch(saveArt(dataURL));
        // canvasService.saveDrawing(dataURL);
    };

    const renderArt = (ctx, canvas) => {
        const game = gameSessions[gameSessions.length - 1];
        // console.log(game);
        const img = new Image();
        img.src = game.artURL;
        ctx.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
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
            <button onClick={onSaveArt}>Save</button>
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
                    touchEvs={touchEvsRef.current}
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
