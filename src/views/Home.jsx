import { useRef, useEffect, useCallback } from 'react';
import { utilService } from '../services/utilService';
import { socketService } from '../services/socketService';
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { savePlayer } from '../store/actions/playerActions';
import { useHistory } from 'react-router-dom';
import { useToggle } from '../hooks/useToggle';
import { loadGameSessions } from '../store/actions/gameActions';
import { useSelector } from 'react-redux';
import { BestSession } from '../cmps/BestSessionCmps/BestSession';

export const Home = () => {
    const [playerName, handleChange, setPlayerName] = useForm('');
    const dispatch = useDispatch();
    const history = useHistory();

    const inputRef = useRef();

    const { gameSessions } = useSelector((state) => state.gameModule);

    const [isDrawerArrived, setIsDrawerArrived] = useToggle(false);

    useEffect(() => {
        dispatch(loadGameSessions());
        socketService.on('drawer arrived', () => {
            setIsDrawerArrived(true);
        });
    }, []);

    useEffect(() => {
        inputRef.current.focus();
        setPlayerName(playerName);
    }, [playerName]);

    const onStart = (ev) => {
        ev.preventDefault();
        if (!playerName) {
            inputRef.current.focus();
            return;
        }

        history.push('/waiting');
    };

    const onSavePlayer = (type) => {
        if (!playerName) return;
        dispatch(
            savePlayer({
                id: `p${utilService.makeId()}`,
                name: playerName,
                type,
            })
        );
        // Socket:
        socketService.emit(`${type} arrived`);
    };

    return (
        <section className="home-page-container">
            <h1>Welcome!</h1>
            <form onSubmit={onStart}>
                <section className="name-input-container">
                    <label htmlFor="playerName"></label>
                    <input
                        onChange={handleChange}
                        value={playerName}
                        type="text"
                        name="playerName"
                        id="playerName"
                        placeholder="Enter your name..."
                        ref={inputRef}
                    />
                </section>
                <button onClick={() => onSavePlayer('drawer')}>Draw</button>
                <button
                    onClick={() => onSavePlayer('guesser')}
                    className={!isDrawerArrived ? 'disabled' : ''}
                >
                    Guess
                </button>
            </form>
            <div className="best-session-container">
                <BestSession gameSessions={gameSessions} />
            </div>
        </section>
    );
};
