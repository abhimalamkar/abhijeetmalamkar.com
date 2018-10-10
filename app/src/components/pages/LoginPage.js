import React from "react";
import PropTypes from "prop-types"
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import {login} from '../../redux/actions/auth'
import LoginForm from "../forms/LoginForm";

class LoginPage extends React.Component {

  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

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
      this.props.login(postData).then(() => this.props.history.push("/dashboard"));
    };

    return (
      <div>
        <h1>LoginPage</h1>
        <LoginForm submit={this.submit} />

        <Link to="/forgot_password">Forgot Password</Link>

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

LoginPage.protoTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
}

export default connect(null ,{ login })(LoginPage);
