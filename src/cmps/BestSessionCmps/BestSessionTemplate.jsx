import moment from 'moment';

export const BestSessionTemplate = ({ bestSession }) => {
    const getLetterS = (num) => {
        return num > 1 ? 's' : '';
    };

    return bestSession.score || bestSession.length ? (
        <section className="best-data-container">
            {Array.isArray(bestSession) ? (
                <section>
                    <h2>We Have a Tie</h2>
                    {bestSession.map((session) => (
                        <div key={session._id}>
                            <h3>
                                <span>Name:</span> {session.guesser.name}
                            </h3>
                            <h3>
                                <span>Score:</span> {session.score} Point
                                {getLetterS(session.score)}
                            </h3>
                            <h3>
                                <span>Time:</span> {session.time} Second
                                {getLetterS(session.time)}
                            </h3>
                            <h4>{moment(session.endedAt).calendar()}</h4>
                        </div>
                    ))}
                </section>
            ) : (
                <section>
                    <div>
                        <h3>
                            <span>Name:</span> {bestSession.guesser.name}
                        </h3>
                        <h3>
                            <span>Score:</span> {bestSession.score} Point
                            {getLetterS(bestSession.score)}
                        </h3>
                        <h3>
                            <span>Time:</span> {bestSession.time} Second
                            {getLetterS(bestSession.time)}
                        </h3>
                        <h4>{moment(bestSession.endedAt).calendar()}</h4>
                    </div>
                </section>
            )}
        </section>
    ) : null;
};

{
    /* <img src={require(`../assets/img/loading.gif`)} className="loading-gif" /> */
}
