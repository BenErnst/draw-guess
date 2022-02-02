import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadGameSessions, setWord } from '../store/actions/gameActions';
import { randomWordsService } from '../services/randomWordsService';
import { Word } from '../cmps/Word';
import { useHistory } from 'react-router-dom';

export const WordChoosing = () => {
    const [words, setWords] = useState([]);

    const { player } = useSelector((state) => state.playerModule);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(loadGameSessions());
        onSetWords();
    }, []);

    const onSetWords = () => {
        setWords(randomWordsService.getWords());
    };

    const chooseWord = (word) => {
        dispatch(setWord(word));
        history.push('/drawing');
    };

    const wordsComponent = words.map((word) => (
        <Word key={word.id} word={word} onChooseWord={chooseWord} />
    ));

    return (
        <section>
            <h1>Hey {player.name}!</h1>
            {wordsComponent}
            <button onClick={onSetWords}>Get Other Words</button>
        </section>
    );
};
