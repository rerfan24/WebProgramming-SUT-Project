import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

function OCounter() {
    const { id } = useParams();
    const [counter, setCounter] = useState(0);
    const [titleCounterShow, setTitleCounterShow] = useState("");
    const [dayCounterShow, setDayCounterShow] = useState("");
    const [hourCounterShow, setHourCounterShow] = useState("");
    const [minuteCounterShow, setMinuteCounterShow] = useState("");
    const [secondCounterShow, setSecondCounterShow] = useState("");
    let history = useHistory();

    useEffect(()=> {
        if (!localStorage.getItem("accessToken")) {
            history.push("/");
        }
        axios.get(`http://localhost:3001/own/${id}`).then((response) => {
            console.log()
            const deadline = new Date(response.data.year, response.data.month, response.data.day, response.data.hour, response.data.minute, response.data.second, 0)
            setTitleCounterShow(response.data.title)
            setCounter(deadline.getTime());
        })
    }, []);

    setInterval(() => {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = counter - now;
          
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
        // Output the result in an element with id="demo"
        setDayCounterShow(days)
        setHourCounterShow(hours)
        setMinuteCounterShow(minutes)
        setSecondCounterShow(seconds)
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval();
            setDayCounterShow(0)
            setHourCounterShow(0)
            setMinuteCounterShow(0)
            setSecondCounterShow(0)
        }
    }, 1000);

    return (
        <div>
            <h1 className='title-counter'> { titleCounterShow } </h1>
        <div className='countdown'>
            <div className='day-countdown'>
                 <h2>{ dayCounterShow }</h2>
                 <h4>
                     Days
                 </h4>
            </div>
            <div className='hour-countdown'>
                <h2>{ hourCounterShow }</h2>
                 <h4>
                     Hours
                 </h4>
            </div>
            <div className='minute-countdown'>
                <h2>{ minuteCounterShow }</h2>
                 <h4>
                     Minutes
                 </h4>
            </div>
            <div className='second-countdown'>
                <h2>{ secondCounterShow }</h2>
                <h4>
                     Seconds
                 </h4>
            </div>
        </div>
        </div>
    )
}

export default OCounter