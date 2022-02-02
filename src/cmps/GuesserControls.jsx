import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';

export const GuesserControls = ({ guesser, word, onEndGame }) => {
    const [guess, handleChange, setGuess] = useForm('');

    useEffect(() => {
        setGuess(guess);
    }, [guess]);

    const onGuess = (ev) => {
        ev.preventDefault();
        if (guess.toLowerCase() === word.txt.toLowerCase()) {
            console.log('Correct!');
            onEndGame(guesser, word.rank.points);
        } else {
            console.log('Try Again!');
        }
        setGuess('');
    };

    return (
        <div>
            <form onSubmit={onGuess} className="enter-guess-form">
                <section className="input-container">
                    <label htmlFor="guess"></label>
                    <input
                        onChange={handleChange}
                        value={guess}
                        type="text"
                        name="guess"
                        id="guess"
                        placeholder="What is it?..."
                    />
                </section>
                <button>Guess</button>
            </form>
        </div>
    );
};
