import { useHistory, NavLink } from 'react-router-dom';

export const AppHeader = () => {
    const history = useHistory();

    return (
        <header className="app-header">
            <section className="container">
                <h2>Draw & Guess</h2>
                <nav>
                    <NavLink activeClassName="my-active" exact to="/">
                        Home
                    </NavLink>
                </nav>
            </section>
        </header>
    );
};
