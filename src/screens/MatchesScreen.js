import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Grid } from "@mui/material";

import MatchCard from "../components/MatchCard";

import "./matchScreen.css";

const MatchesScreen = () => {
  const [matchData, setMatchData] = useState([]);

  const getMatchData = async () => {
    const result = await axios.get("/matches");
    const matches = await result.data.matches;
    setMatchData(matches);
  };

  useEffect(() => {
    getMatchData();
  }, []);

  return (
    <>
      <Header />
      <Grid className="matchesPage">
        <Container>
          <Grid container spacing={4}>
            <MatchCard data={matchData} />
          </Grid>
        </Container>
      </Grid>
      <Footer />
    </>
  );
};

export default MatchesScreen;
