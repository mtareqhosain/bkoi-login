import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import StyledLogin from './Auth/StyledLogin'



export default class Main extends React.PureComponent {

    state = {
        isAuth: true,
        token: localStorage.getItem('token')
    }

    componentDidMount() {
        if(this.state.token == null) {
            this.setState({
                isAuth: false
            })
        }
    }

    render() {
        return (
            <div className='App'>
                    <Switch>
                        <Route exact path='/' component={ StyledLogin } />
                        <Route path='/dashboard' component={ Dashboard } />
                    </Switch>
            </div>
        )
    }
}