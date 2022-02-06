import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Word } from '../cmps/Word';
import { setWord } from '../store/actions/gameActions';
import { socketService } from '../services/socketService';
import { randomWordsService } from '../services/randomWordsService';

export const WordChoosing = () => {
    const [words, setWords] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        onSetWords();
    }, []);

    const onSetWords = () => {
        setWords(randomWordsService.getWords());
    };

    const chooseWord = (word) => {
        dispatch(setWord(word));
        socketService.emit('new word chosen');
        history.push('/drawing');
        socketService.emit('drawer is ready to play');
    };

    const wordsComponent = words.map((word) => (
        <Word key={word.id} word={word} onChooseWord={chooseWord} />
    ));

    return (
        <section className="word-choosing-container">
            <h1>Pick a Word</h1>
            {wordsComponent}
            <button onClick={onSetWords} className="get-other-words-btn">
                Get Other Words
            </button>
        </section>
    );
};
