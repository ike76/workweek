import React, { Component } from "react";
import _GoogleLogin from "react-google-login";

export class GoogleLogin extends Component {
  responseGoogle = response => {
    console.log(response);
  };
  render() {
    return (
      <_GoogleLogin
        clientId="212388374479-n12uo2qkq8n50s8965avbhd6c719s6aj.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}

export default GoogleLogin;
