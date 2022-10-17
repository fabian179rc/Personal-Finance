import React from "react";
import { createUser } from "../redux/actions/user";
import { GoogleOAuthProvider } from "@react-oauth/google"; // npm i @react-oauth/google
import { GoogleLogin } from "@react-oauth/google"; // npm i @react-oauth/google
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import style from "../Styles/Login.module.css";

export default function Login() {
  const dispatch = useDispatch();

  function createOrGetUserGoogle(response) {
    const decoded = jwt_decode(response.credential);
    const { email, name, picture } = decoded;
    const userObject = {
      username: name,
      email,
      img: picture,
    };
    dispatch(createUser(userObject));
  }
  return (
    <div className={style.login}>
      <section>
        <p>
          <strong>Login</strong>
        </p>

        <GoogleOAuthProvider clientId="832028799556-l5odjjibtasaog2nqnskmtkcn0og6n3q.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUserGoogle(response);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </section>
    </div>
  );
}
