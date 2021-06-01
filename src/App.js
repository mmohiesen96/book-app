import React from 'react';
import Header from './Header';
import './App.css';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Profile from './Profile'
import MyFavoriteBooks from './myFavoriteBooks'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {

  render() {
    console.log('app', this.props)
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                {this.props.auth0.isAuthenticated ? <MyFavoriteBooks /> : <Login />}
              </Route>
              <Route exact path="/profile">
                {this.props.auth0.isAuthenticated && <Profile />}
              </Route>
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
