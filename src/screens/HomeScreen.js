import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  InputAdornment,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./HomeScreen.css";
import futsalData from "../dummyFutsalData";
import FutsalCard from "../components/FutsalCard";

const Body = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(futsalData);
  }, []);

  return (
    <>
      <section className="section1">
        <Container>
          <Grid className="content" container>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" color="white">
                Search Futsal Grounds Nearby
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="searchTitle">
                <Typography variant="h6" color="white">
                  Pick your location
                </Typography>
              </div>
              <TextField
                id="Location"
                label="Where ?"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationOnIcon style={{ color: "white" }} />
                    </InputAdornment>
                  ),
                  style: { color: "#ffff" },
                }}
                InputLabelProps={{
                  style: { color: "#ffff", textAlign: "center" },
                }}
                variant="filled"
                style={{ color: "white" }}
              />
              <Button
                variant="filled"
                style={{ padding: "20px", backgroundColor: "primary" }}
              >
                Go
              </Button>
            </Grid>
            <Button
              component={Link}
              to="/matches"
              variant="contained"
              style={{ margin: "80px auto" }}
            >
              See all matches
            </Button>
          </Grid>
        </Container>
      </section>
      <section className="section2">
        <Typography variant="h3" textAlign="center" padding="35px 0 35px 0">
          Recommended For You
        </Typography>
        <Container>
          <Grid container spacing={4}>
            <FutsalCard data={data} />
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default Body;
