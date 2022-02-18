import React, { useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

  const [error, setError] = useState("");
  let { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    if (localStorage.length !== 0) {
      history.push("/")
    }
  }, []);

  const login = (data) => {
    axios.post("http://localhost:3001/users/login", data).then((response) => {
      if (response.data.error) {
        setError(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          photo: response.data.photo,
          status: true,
        });
        history.push("/");
      }
    });
  }

  return (
    <div id="wrap">
      <div className="input-content-wrap">
      <Formik
        initialValues={initialValues}
        onSubmit={login}
      >
        <Form className="formContainer">
          <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              className="inputCreatePost"
              name="username"
              placeholder="(Ex. myName123...)"
            />

          <label>Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              className="inputCreatePost"
              name="password"
              placeholder="Your Password..."
            />
            <button type="submit">Login</button>
          </Form>
        </Formik>
    </div>
    <h4>{error}</h4>
    </div>
  )
}

export default Login