import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Grid, CircularProgress} from "@mui/material";

import Notification from "../components/Notification";

import MatchCard from "../components/MatchCard";


import "./matchScreen.css";
//actions
import { listMatches } from "../actions/matchesActions";


const MatchesScreen = () => {
 
  const dispatch = useDispatch()

  const { loading, matches, error } = useSelector((state) => state.matches)

  useEffect(() => {
    dispatch(listMatches())
  }, [dispatch]);

  return (
    <>
      {loading ? <CircularProgress sx={{ margin: 'auto', position: 'absolute', top: '48%', left: '48%' }} /> :
        error ? <>
          <Header />
          <Notification severity='error' message={error} />
          <div style={{height:'100vh'}}>x </div>
          </>
          :
        <>
        <Header />
        <Grid className="matchesPage">
        <Container>
          <Grid container spacing={4}>
            <MatchCard data={matches} />
          </Grid>
        </Container>
        </Grid>
          <Footer />
          </>
      }
    </>
  );
};

export default MatchesScreen;
