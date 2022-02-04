import { useRef, useEffect } from 'react';
import { utilService } from '../services/utilService.js';
import { socketService } from '../services/socketService';
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { savePlayer } from '../store/actions/playerActions';
import { useHistory } from 'react-router-dom';

export const Home = () => {
    const [playerName, handleChange, setPlayerName] = useForm('');
    const dispatch = useDispatch();
    const history = useHistory();

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        setPlayerName(playerName);
    }, [playerName]);

    const onStart = (ev) => {
        ev.preventDefault();
        // console.log('');

        history.push('/waiting');
    };

    const onSavePlayer = (type) => {
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
        <section>
            <h1>Welcome</h1>
            <form onSubmit={onStart} className="enter-name-form">
                <section className="input-container">
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
                <button onClick={() => onSavePlayer('guesser')}>Guess</button>
            </form>
        </section>
    );
};
