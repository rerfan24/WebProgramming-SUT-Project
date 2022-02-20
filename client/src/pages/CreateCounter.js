import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext"
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import { da } from 'date-fns/locale';
import axios from 'axios';

function CreateCounter() {
    const { authState } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

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
        // year: Yup.number().max(4).positive().required(),
    });

    const onSubmit = (data) => {
        if (selectedDay === null || selectedTime === null) {
            setError("Please Choose Date and Time");
        } else {
            data.year = selectedDay.year;
            data.month = selectedDay.month;
            data.day = selectedDay.day;
            data.hour = selectedTime.getHours();
            data.minute = selectedTime.getMinutes();
            axios.post("http://localhost:3001/own/add", data, {
                    headers: { accessToken: localStorage.getItem("accessToken") },
                })
            .then((response) => {
                history.push("/");
            });
        }
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
                    className="inputCreatePost"
                    name="title"
                    placeholder="(Ex. Title...)"
                />
                <br/>
                <div className='date-picker'>
                    <Calendar
                        value={selectedDay}
                        onChange={setSelectedDay}
                        minimumDate={utils().getToday()}
                        calendarClassName="responsive-calendar"
                        shouldHighlightWeekends
                        colorPrimary='#994ce6'
                    />
                </div>
                <br />
                <div className='time-picker'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticTimePicker
                        label="Select Time"
                        displayStaticWrapperAs="mobile"
                        value={selectedTime}
                        onChange={(newValue) => {
                        setSelectedTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    </div>
                <br/>
                <button className='counter-btn' type="submit"> Create Post</button>
            </Form>
        </Formik>
        <h5>{error}</h5>
      </div>
    )
}

export default CreateCounter