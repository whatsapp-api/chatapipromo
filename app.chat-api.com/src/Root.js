import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Containers
import Full from './containers/Full/'
import auth from './database/auth'

// Views
import Login from './views/Pages/Login/'
import Page404 from './views/Pages/Page404/'

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        auth.onAuthChange(user => this.setState({user, loading: false}));
    }

    render() {
        if (!this.state.user) {
            return <Login/>;
        }
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" name="Home" component={Full}/>
                    <Route component={Page404}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default Root;
