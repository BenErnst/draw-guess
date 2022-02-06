import { useState } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { BestSessionTemplate } from './BestSessionTemplate';

export const BestSession = ({ gameSessions }) => {
    const [bestSession, setBestSession] = useState(null);
    const [isBestInfoShown, setIsBestInfoShown] = useToggle(false);

    const toggleBestInfo = () => {
        setIsBestInfoShown((prevState) => !prevState);
        isBestInfoShown ? setBestSession(null) : setBestSession(getBest());
    };

    const getBest = () => {
        const sortedScores = getSortedScores();
        const sortedTimes = getSortedTimes();
        const [bestScoreSession, bestTimeSession] = [sortedScores[0], sortedTimes[0]];

        const scoresDiff = bestScoreSession.score - bestTimeSession.score;
        const timesDiff = bestScoreSession.time - bestTimeSession.time;

        if (scoresDiff > 0 && timesDiff < 0) return bestScoreSession;
        else if (scoresDiff < 0 && timesDiff > 0) return bestTimeSession;
        // Tie case:
        else if (scoresDiff === timesDiff) {
            if (bestScoreSession._id === bestTimeSession._id) return bestScoreSession;
            // Tie case:
            else return [bestScoreSession, bestTimeSession];
            //
        } else if (Math.abs(scoresDiff) > Math.abs(timesDiff)) return bestScoreSession;
        else if (Math.abs(scoresDiff) < Math.abs(timesDiff)) return bestTimeSession;
    };

    const getSortedScores = () => {
        let sessions = [...gameSessions];
        return sessions.sort((a, b) => {
            return b.score - a.score;
        });
    };

    const getSortedTimes = () => {
        let sessions = [...gameSessions];
        return sessions.sort((a, b) => {
            return a.time - b.time;
        });
    };

    return (
        <section className="best-session-container">
            <button onClick={toggleBestInfo}>
                Best Session Info <span>{isBestInfoShown ? '⬆' : '⬇'}</span>
            </button>
            {bestSession && <BestSessionTemplate bestSession={bestSession} />}
        </section>
    );
};
