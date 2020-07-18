import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({});

  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        history.push("/");
      });
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="login">
        <form onSubmit={login}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={credentials.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="Password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={handleChange}
            />
          </label>
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
