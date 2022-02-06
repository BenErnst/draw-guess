import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { useToggle } from '../hooks/useToggle';

export const GuesserControls = ({ guesser, word, onEndGame }) => {
    const [guess, handleChange, setGuess] = useForm('');
    const [isCorrect, setIsCorrect] = useToggle(true);

    useEffect(() => {
        setGuess(guess);
    }, [guess]);

    const onGuess = (ev) => {
        ev.preventDefault();
        if (guess.toLowerCase() === word.txt.toLowerCase()) {
            console.log('Correct!');
            onEndGame(guesser, word.rank.points);
        } else {
            setIsCorrect(false);
            setTimeout(() => {
                setIsCorrect(true);
            }, 1500);
        }
        setGuess('');
    };

    return (
        <div className="guesser-controls-container">
            <form onSubmit={onGuess} className="enter-guess-form">
                <section className="input-container">
                    <label htmlFor="guess"></label>
                    <input
                        onChange={handleChange}
                        value={guess}
                        type="text"
                        name="guess"
                        id="guess"
                        placeholder="Your Guess..."
                    />
                </section>
                <button>OK!</button>
            </form>
            <p className={!isCorrect ? 'visible' : 'hidden'}>Try Again</p>
        </div>
    );
};
