import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const { authState } = useContext(AuthContext);
  const [listOfCounters, setlistOfCounters] = useState([]);
  const [listOfOCounters, setlistOfOCounters] = useState([]);
  const [loading, setLoading] = useState(false);
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
          let list = []
          for (let i = 0; i < response.data.listOfOCounters.length; i++) {
            if (response.data.listOfOCounters[i].UserId === authState.id) {
              list.push(response.data.listOfOCounters[i]);
            }
          }
          setlistOfOCounters(list)
          setLoading(true);
        }
    });
    
  }, [loading]);


  return (
    <div className='counters-above'>
      <h2> Global Counters </h2>
      <div className="counters">
      {listOfCounters.map((value, key) => {
        return (
          <div key={key} className="counter">
            <div 
              className="title"
              style={{backgroundImage: `url(${value.photo})`}}  
            >
                {value.title} 
            </div>
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
      {authState.status && <h2> Your Counters </h2>}
      <div className="counters">
      {listOfOCounters.map((value, key) => {
        return (
          <div key={key} className="counter">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                history.push(`/own/${value.id}`);
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
    </div>
  )
}

export default Home