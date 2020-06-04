import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  Home,
  Profile,
  EditProfile,
  Images,
  Register,
  Login
} from './_Pages'
import { useSelector } from 'react-redux'
import { Navigation } from './_Components/_Navigation/Navigation'

const App = () => {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/editprofile">
          <EditProfile />
        </Route>
        <Route path="/login">
          {isAuthenticated ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path={`/images/:id`}>
          <Images />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
