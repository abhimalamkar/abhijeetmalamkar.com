import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import { Container } from "semantic-ui-react";

import HomePage from "./components/pages/HomePage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import DashboardPage from "./components/pages/DashboardPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from './components/navigation/TopNavigation'
import NewStoryPage from './components/pages/NewStoryPage'
import StoryPage from './components/story/StoryPage'
import UserProfilePage from './components/user_profile/UserProfilePage'

const App = ({ location, isAuthenticated }) => ( 
  <div>
    {isAuthenticated && <TopNavigation/>}
  <div className="app">
  <Container>
    <Route location={location} path="/" exact component={HomePage} />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
    />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      path="/story/:id"
      exact
      component={StoryPage}
    />
    <UserRoute
      location={location}
      path="/@:username"
      exact
      component={UserProfilePage}
    />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path="/new-story"
      exact
      component={NewStoryPage}
    />
    </Container>
  </div>
  </div>
);

App.protoTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated : PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  }
}

export default connect(mapStateToProps)(App);
