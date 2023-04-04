import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from "./components/App";
import AllResults from './components/AllResults';

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <App />
                </Route>
                <Route exact path="/results">
                    <AllResults />
                </Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;
