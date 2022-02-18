import React from "react";
import { Link } from "react-router-dom";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { useState } from "react";

function PageNotFound() {
    const [notFoundTimer, setnotFoundTimer] = useState(false);
    setInterval(() => {
        const today = new Date();
        let s = today.getSeconds();
        if (s % 2 === 0) {
            setnotFoundTimer(true);
        } else {
            setnotFoundTimer(false);
        }
    }, 500);
    return (
        <div className="page404">
        <br />
        {notFoundTimer ?
            <HourglassBottomIcon className="bottom-hour-glass"/> :
            <HourglassTopIcon className="top-hour-glass" />
        }
        <h1>Page Not Found  </h1>
        {notFoundTimer ?
            <HourglassBottomIcon className="bottom-hour-glass"/> :
            <HourglassTopIcon className="top-hour-glass" />
        }
        <h3>Click<Link to="/">here</Link> ‌ ‌ ‌to go back Home.</h3>
        </div>
    );
}

export default PageNotFound;
