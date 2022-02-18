import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext"
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

function CreateCounter() {
    const { authState } = useContext(AuthContext);

    let history = useHistory();

    const initialValues = {
        title: "",
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          history.push("/login");
        }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        year: Yup.number().max(4).positive().required(),
    });

    const onSubmit = (data) => {
        
    };

    return (
      <div className='createCounterPage'>
        <Formik
            initialValues = {initialValues}
            onSubmit = {onSubmit}
            validationSchema = {validationSchema}
        >
            <Form>
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>
                <Field 
                  autoComplete="off"
                  id="inputCreatePost"
                  name="title"
                  placeholder="(Ex. Title...)"
                />
                <button type="submit"> Create Post</button>
            </Form>
        </Formik>
      </div>
    )
}

export default CreateCounter