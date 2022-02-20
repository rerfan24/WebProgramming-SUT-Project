import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Home() {

  const [listOfCounters, setlistOfCounters] = useState([]);
  const [listOfOCounters, setlistOfOCounters] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/global")
      .then((response) => {
        setlistOfCounters(response.data.listOfCounters);
    });
    axios
      .get("http://localhost:3001/own", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (!response.data.error) {
          setlistOfOCounters(response.data.listOfOCounters)
        }
    });
  }, []);

  return (
    <div className="counters">
      {listOfCounters.map((value, key) => {
        return (
          <div key={key} className="counter">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                history.push(`/global/${value.id}`);
              }}
            >
              {value.year}
              <br />
              <span>countdown</span>
            </div>
          </div>
        );
      })}
      {listOfOCounters.map((value, key) => {
        return (
          <div key={key} className="counter">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                history.push(`/global/${value.id}`);
              }}
            >
              {value.year}
              <br />
              <span>countdown</span>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home