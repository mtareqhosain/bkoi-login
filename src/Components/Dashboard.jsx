import React from 'react'
import { Redirect, Link } from 'react-router-dom'

class Dashboard extends React.PureComponent {

    state = {
        isAuth: true,
        email: localStorage.getItem('userEmail'),
        token: localStorage.getItem('token')
    }

    componentDidMount() {
        if(this.state.token == null) {
            this.setState({
                isAuth: false
            })
        }
    }

    logoutHandle = () => {
          console.log('logout clicked')  
          localStorage.clear();
          this.setState({
              isAuth: false,
              token: null
          })
    }

    render() {

        if(this.state.isAuth === false ) {
            return <Redirect to='/' />
        }

        return (
            <Link exact to='/dashboard' style={{textDecoration: 'none', color: 'black'}}>
                <div>
                    <h1>Welcome to Dashboard</h1>
                    <p>Email address: {this.state.email}</p>
                    <p>Token: {this.state.token}</p>

                    <button style={{...styleButton}} onClick={this.logoutHandle}>Logout</button>
                </div>
            </Link>
        )
    }
}

const styleButton = {
    padding: '4px',
    border: '1px black solid',
}

export default Dashboard