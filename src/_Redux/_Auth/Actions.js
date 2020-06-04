import { LOGIN_REQUEST } from './Type';
import { LOGIN_SUCCESS } from './Type';
import { LOGIN_FAILURE } from './Type';
import { LOGOUT_SUCCESS } from './Type';
import { REGISTER_REQUEST } from './Type';
import { REGISTER_SUCCESS } from './Type';
import { REGISTER_FAILURE } from './Type';
import Cookies from 'js-cookie';

// Actions for Login
export const requestLogin = (identifier, password) => {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        identifier,
        password
    }
}
export const receiveLogin = (user_token) => {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user_token
    }
}
export const loginError = (message) => {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}
export const loginUser = (identifier, password) => {
    const body = {
        "user": {
            "email": identifier,
            "password": password
        }
    }
    return dispatch => {
        dispatch(requestLogin(identifier, password))
        // console.log("ça fetch");
        return fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        )
            .then(response => response.json().then(user => ({
                token: response.headers.get("authorization"),
                user
            })))
            .then((result) => {
                // console.log(result);
                if (result.token == null) {
                    dispatch(loginError(result.user))
                    return Promise.reject(result.user)
                } else {
                    Cookies.set('id_token', result.token)
                    Cookies.set('user', result.user)
                    dispatch(receiveLogin(result.token))
                    console.log("User registered");
                }
            }).catch(err => console.log("Error: ", err))
    }
}

// Actions for Logout

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
        isAuthenticated: false,
        userToken: false,
        userId: false
    }
}

// Logs the user out
export const logoutUser = () => {
    return dispatch => {
        dispatch(receiveLogout())
    }
}

// Actions for Register
export const requestRegister = (username, email, password) => {
    return {
        type: REGISTER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        username,
        email,
        password
    }
}
export const receiveRegister = (user) => {
    return {
        type: REGISTER_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}
export const registerError = (message) => {
    return {
        type: REGISTER_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}
export const registerUser = (username, email, password) => {
    const body = {
        username: username,
        email: email,
        password: password
    }
    return dispatch => {
        dispatch(requestRegister(username, email, password))
        return fetch('http//localhost:3001/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        )
            .then(response =>
                response.json()
                    .then(user => ({ user, response }))
            )
            .then(({ user, response }) => {
                if (!response.ok) {
                    dispatch(registerError(user.message))
                    return Promise.reject(user)
                } else {
                    console.log(user);
                    Cookies.set('id_token', user.jwt)
                    dispatch(receiveRegister(user))
                    console.log("User registered");
                    dispatch(loginUser(username, password))
                }
            }).catch(err => console.log("Error: ", err))
    }
}