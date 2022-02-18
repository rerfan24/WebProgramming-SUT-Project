import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(6, 'Username Cannot be less than 6 charachters').max(15).required('Username is required'),
    password: Yup.string().min(8, 'Password Cannot be less than 8 charachters').max(20).required('Password is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/users/auth", data).then(response => {
      if (response.data !== "SUCCESS") {
        setError(response.data)
      }
      else {
        alert(response.data)
        setError("")
      }
    });
  }

  return (
    <div id="wrap">
      <div className="input-content-wrap">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. John123...)"
            />

          <label>Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="Your Password..."
            />

          <label>Email: </label>
            <ErrorMessage name="email" component="span" />
            <Field
              autoComplete="off"
              type="email"
              id="inputCreatePost"
              name="email"
              placeholder="Your emial..."
            />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
      <h4>{error}</h4>
      </div>
    </div>
  )
}

export default Registration