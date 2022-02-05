import { socketService } from '../services/socketService';
import { useToggle } from '../hooks/useToggle';
import { useHistory } from 'react-router-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Canvas } from '../cmps/Canvas';
import { useEffectUpdate } from '../hooks/useEffectUpdate';
import { loadGameSessions, setGameData, saveImg } from '../store/actions/gameActions';
import { switchPlayers } from '../store/actions/playerActions';
import { GuesserControls } from '../cmps/GuesserControls';
import { canvasService } from '../services/canvasService.js';

export const Drawing = () => {
    const history = useHistory();

    const { currSession } = useSelector((state) => state.gameModule);
    const { player } = useSelector((state) => state.playerModule);
    const dispatch = useDispatch();

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const touchEvsRef = useRef(['touchstart', 'touchend', 'touchmove']);

    useEffect(() => {
        dispatch(loadGameSessions());

        // Socket:
        socketService.on('start drawing', (evPos) => {
            ctxRef.current.beginPath();
            ctxRef.current.moveTo(evPos.x, evPos.y);
        });
        socketService.on('drawing', (evPos) => {
            ctxRef.current.lineTo(evPos.x, evPos.y);
            ctxRef.current.stroke();
        });
        socketService.on('finish drawing', () => {
            ctxRef.current.closePath();
        });

        socketService.on('switch player role', () => {
            dispatch(switchPlayers());
        });

        socketService.on('new word chosen', () => {
            dispatch(loadGameSessions());
        });
    }, []);

    useEffectUpdate(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.strokeStyle = '#2d2d2d';
        ctx.lineWidth = 3;
        ctxRef.current = ctx;
    }, [currSession]);

    const renderImg = useCallback((ctx, canvas) => {
        if (!currSession) return;
        const img = new Image();
        img.src = currSession.imgURL;
        ctx.current.drawImage(img, 0, 0, canvas.current.width / 2, canvas.current.height / 2);
    }, []);

    const startDrawing = (ev) => {
        const evPos = getEvPos(ev);

        // Socket:
        socketService.emit('start drawing', evPos);

        ctxRef.current.beginPath();
        ctxRef.current.moveTo(evPos.x, evPos.y);
    };

    const finishDrawing = () => {
        // Socket:
        socketService.emit('finish drawing');

        ctxRef.current.closePath();
    };

    const draw = (ev) => {
        if (player.type === 'guesser') return;
        const evPos = getEvPos(ev);

        // Socket:
        socketService.emit('drawing', evPos);

        ctxRef.current.lineTo(evPos.x, evPos.y);
        ctxRef.current.stroke();
    };

    const getEvPos = (ev) => {
        var pos;
        if (touchEvsRef.current.includes(ev.type)) {
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

    const onSaveImg = () => {
        var dataURL = canvasRef.current.toDataURL();
        dispatch(saveImg(dataURL));
    };

    const endGame = (guesser, points) => {
        dispatch(setGameData(guesser, points));
        dispatch(switchPlayers());

        // Socket:
        socketService.emit('switch player role');

        if (player.type === 'guesser') history.push('/word-choosing');
    };

    const drawerControls = (
        <div>
            <button onClick={history.goBack}>⬅Words</button>
            <button onClick={onSaveImg}>Save</button>
        </div>
    );

    return currSession && player ? (
        <section>
            <h1>Drawing here</h1>
            <h2>{currSession.word.txt}</h2>
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
                <GuesserControls guesser={player} word={currSession.word} onEndGame={endGame} />
            )}
        </section>
    ) : (
        <img src={require(`../assets/img/loading.gif`)} className="loading-gif" />
    );
};
