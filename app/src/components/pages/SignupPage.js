import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GoogleLogin from 'react-google-login'

import { signup } from "../../redux/actions/users";
import SignupForm from "../forms/SignupForm";

class SignupPage extends React.Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));

  render() {
    const responseGoogle = res => {
      let postData = {
        name: res.w3.ig,
        provider: "google",
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
      
      // build our user data
      this.props.signup(postData).then(() => this.props.history.push("/dashboard"));
    };

    return (
      <div>
        <SignupForm submit={this.submit} />

        <GoogleLogin
          clientId="388366110219-ac1kns0nvrkjtuj2afemf1objfvkipmr.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(
  null,
  { signup }
)(SignupPage);
