import { useHistory } from 'react-router-dom';

export const AppHeader = () => {
    const history = useHistory();

    return (
        <header className="app-header">
            <section className="container">
                <h2>Draw & Guess</h2>
                <button onClick={() => history.push('/')}>Home</button>
            </section>
        </header>
    );
};
