import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function GCounter() {
    const { id } = useParams();
    const [counter, setCounter] = useState(0);
    const [counterShow, setCounterShow] = useState("");

    useEffect(()=> {
        axios.get(`http://localhost:3001/global/${id}`).then((response) => {
            console.log()
            const deadline = new Date(response.data.year, response.data.month, response.data.day, response.data.hour, response.data.minute, response.data.second, 0)
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
        setCounterShow(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
          
        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval();
          setCounterShow("EXPIRED");
        }
    }, 1000);

    return (
        <div>
            <div> { counterShow }</div>
        </div>
    )
}

export default GCounter