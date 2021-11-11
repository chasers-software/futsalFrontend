import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Grid, CircularProgress } from "@mui/material";

import Notification from "../components/Notification";

import MatchCard from "../components/MatchCard";

import "./matchScreen.css";
//actions
import { listMatches } from "../actions/matchesActions";

import {
  futsals,
  dates,
  startTimes,
  endTimes,
  prices,
  statuses,
} from "../dummyFilter";

const MatchesScreen = () => {
  const [filter, setFilter] = useState({
    futsalName: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
    status: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filter);
    dispatch(listMatches(filter));
  };

  const dispatch = useDispatch();

  const { loading, matches, error } = useSelector((state) => state.matches);

  useEffect(() => {
    dispatch(listMatches({}));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <CircularProgress
          sx={{ margin: "auto", position: "absolute", top: "48%", left: "48%" }}
        />
      ) : error ? (
        <>
          <Header />
          <Notification severity="error" message={error} />
          <div style={{ height: "100vh" }}>x </div>
        </>
      ) : (
        <>
          <Header />
          <Grid className="filter">
            <Container>
              <form>
                <select
                  name="futsalName"
                  value={filter.futsalName}
                  onChange={handleChange}
                >
                  <option value="">All Futsals</option>
                  {futsals.map((futsal) => {
                    return <option value={futsal}>{futsal}</option>;
                  })}
                </select>

                <select name="date" value={filter.date} onChange={handleChange}>
                  <option value="">All Dates</option>
                  {dates.map((date) => {
                    return <option value={date}>{date}</option>;
                  })}
                </select>

                <select
                  name="startTime"
                  value={filter.startTime}
                  onChange={handleChange}
                >
                  <option value="">All Start Time</option>
                  {startTimes.map((startTime) => {
                    return <option value={startTime}>{startTime}</option>;
                  })}
                </select>

                <select
                  name="endTime"
                  value={filter.endTime}
                  onChange={handleChange}
                >
                  <option value="">All End Time</option>
                  {endTimes.map((endTime) => {
                    return <option value={endTime}>{endTime}</option>;
                  })}
                </select>

                <select
                  name="price"
                  value={filter.price}
                  onChange={handleChange}
                >
                  <option value="">All Prices</option>
                  {prices.map((price) => {
                    return <option value={price}>{price}</option>;
                  })}
                </select>

                <select
                  name="status"
                  value={filter.status}
                  onChange={handleChange}
                >
                  <option value="">All Status</option>
                  {statuses.map((status) => {
                    return <option value={status}>{status}</option>;
                  })}
                </select>

                <button type="submit" onClick={handleSubmit}>
                  Filter
                </button>
              </form>
            </Container>
          </Grid>
          <Grid className="matchesPage">
            <Container>
              <Grid container spacing={4}>
                <MatchCard data={matches} />
              </Grid>
            </Container>
          </Grid>
          <Footer />
        </>
      )}
    </>
  );
};

export default MatchesScreen;
