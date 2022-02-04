import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/style/global.scss';
import { AppHeader } from './cmps/AppHeader';
import { Home } from './views/Home';
import { WordChoosing } from './views/WordChoosing';
import { Waiting } from './views/Waiting';
import { Drawing } from './views/Drawing';

export function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader />
                <main className="container">
                    <Switch>
                        <Route component={Drawing} path="/drawing" />
                        {/* <Route component={Drawing} path="/drawing/:id" /> */}
                        <Route component={WordChoosing} path="/word-choosing" />
                        <Route component={Waiting} path="/waiting" />
                        <Route component={Home} path="/" />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}
