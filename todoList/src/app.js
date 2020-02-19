import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/home'component={Home} />
                </Switch>
            </Router>
        );
    }
}

export default App;
