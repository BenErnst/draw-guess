import { memo } from 'react';

const _Word = ({ word, onChooseWord }) => {
    const { txt, rank } = word;
    const { level, points } = rank;

    return (
        <section className="words-container">
            <button onClick={() => onChooseWord(word)}>{txt}</button>
            <p>{level}</p>
            <p>
                {points} point{points > 1 ? 's' : ''}
            </p>
        </section>
    );
};

export const Word = memo(_Word);
