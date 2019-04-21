import React from "react";
import GoogleLogin from "react-google-login";

const responseGoogle = response => {
  console.log(response);
};
export default function GoogleLoginBtn(props) {
  return (
    <GoogleLogin
      clientId="946233972394-rvpkdri1ppv4il9pia837sh0c7vnpegf.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={response => {
        props.loginUserwithGoogle(response);
      }}
      onFailure={responseGoogle}
    />
  );
}
