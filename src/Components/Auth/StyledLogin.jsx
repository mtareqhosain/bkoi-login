// Import Third-party Packages
import React from 'react'
//import PropTypes from 'prop-types'
import axios from 'axios';
import { Redirect } from 'react-router-dom'

// Import Components
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class StyledLogin extends React.PureComponent {

    state = {
        email: '',
        password: '',
        emailErrorMsg: '',
        passwordErrorMsg: '',
        serverErrorMsg: '',
        isAuth: false,
        token: localStorage.getItem('token')
    }

    componentDidMount() {
        if(this.state.token == null) {
            this.setState({
                isAuth: false
            })
        } else {
            this.setState({
                isAuth: true
            })
        }
    }

    onChangeEmail = event => {
        ((!event.target.value) ?
            (this.setState({
                emailErrorMsg: 'Required field',
                email: '',
            })) :
            (this.setState({
                serverErrorMsg: ''
            }))
        )

        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)) {
            //console.log('valid email');
            this.setState({
                emailErrorMsg: '',
                email: event.target.value,
            })
        } else {

            this.setState({
                emailErrorMsg: 'Invalid email address',
                email: '',
            })
            //console.log('invalid email address')
        }
        //console.log('error msg: ', this.state.email)

    }

    onChangePassword = event => {

        ((!event.target.value) ?
            (this.setState({
                passwordErrorMsg: 'Required field',
                password: '',
            })) :
            (this.setState({
                serverErrorMsg: ''
            }))
        )

        if ((event.target.value.length) < 6) {
            this.setState({
                passwordErrorMsg: 'Password must be atleast 6 digit!',
                password: '',
            })
        }
        else {
            this.setState({
                passwordErrorMsg: '',
                password: event.target.value,
            })
        }
        console.log('email: ', this.state.email)
        console.log('password: ', this.state.password)

    }

    onSubmit = event => {
        console.log('submit button clicked')
        event.preventDefault()

        const userLoginInformation = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post(`https://admin.barikoi.xyz:8090/auth/login`, userLoginInformation)
            .then(res => {
                // console.log(res);
                // console.log(res.data);

                if (res.data.success === true) {
                    localStorage.setItem('token', res.data.data)
                    localStorage.setItem('userEmail', this.state.email)
                    this.setState({
                        isAuth: true
                    })
                }

            }).catch(err => {
                console.error(err.response.data.success);
                if (err.response.data.success === false) {
                    this.setState({
                        serverErrorMsg: err.response.data.message
                    })
                } else {
                    this.setState({
                        serverErrorMsg: ''
                    })
                }
            })
    }

    render() {

        if(this.state.isAuth) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Container maxWidth='xs' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CssBaseline />
                <Container style={{ ...InnerContainerStyle }}>
                    <Avatar style={{ ...AvatarStyle }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>

                    <form onSubmit={event => { this.onSubmit(event) }} style={{ ...FormStyles }} noValidate>
                        <StyledTextField
                            error={this.state.emailErrorMsg || this.state.serverErrorMsg ? true : false}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={event => { this.onChangeEmail(event) }}
                            helperText={!this.state.serverErrorMsg ? this.state.emailErrorMsg : null}
                        />
                        <StyledTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={event => { this.onChangePassword(event) }}
                            error={this.state.passwordErrorMsg || this.state.serverErrorMsg ? true : false}
                            helperText={!this.state.serverErrorMsg ? this.state.passwordErrorMsg : this.state.serverErrorMsg}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <StyledButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ ...SubmitButtonStyle }}
                        >
                            Log In
                        </StyledButton>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Container>
            //</Link>
        )
    }
}

// JSS Styles
const InnerContainerStyle = {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const AvatarStyle = {
    margin: 4,
    backgroundColor: 'rgb(45, 220, 175)',
}

const FormStyles = {
    width: '100%',
    marginTop: 4
}

const SubmitButtonStyle = {
    background: 'rgb(45, 220, 175, 0.8)',
    color: 'rgba(0, 0, 0, 0.8)',
    margin: '12px 0px 8px',
}

// JSS Styled Components
const StyledTextField = withStyles({
    root: {
        '& .MuiFormLabel-root': { // initial form label color
            color: 'grey',
        },
        '& label.Mui-focused': { // focused form label color
            color: 'black',
        },
        '& .MuiOutlinedInput-root': { // initial outline color
            width: '100%',

            '& fieldset': {
                borderColor: 'rgba(56, 64, 78, 0.5)',
            },
            '&:hover fieldset': {  // hover outline color
                borderColor: 'rgba(56, 64, 78, 0.8)',
            },
            '&.Mui-focused fieldset': { // focused outline color
                borderColor: 'rgba(45, 219, 172, 0.8)',
            },
        },
    },

})(TextField);

const StyledButton = withStyles({
    label: {
        paddingTop: '4px',
    }
})(Button)

// StyledLogin.propTypes = {
//     // email: PropTypes.string.isRequired,
//     // password: PropTypes.oneOf([ PropTypes.string, PropTypes.number, PropTypes.symbol ]).isRequired,
//     // errorMsg: PropTypes.string,
//     //onSubmit: PropTypes.func.isRequired,
// }

// StyledLogin.defaultProps = {
//     // errorMsg: null
// }

export default StyledLogin