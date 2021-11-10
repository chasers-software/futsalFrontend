import React from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const MatchCard = ({ data }) => {
  const getButtonColor = (match) => {
    let color = "info";
    if (match.status === "booked") {
      color = "error";
    }
    return color;
  };

  const getButtonText = (match) => {
    let text = "Book Now";
    if (match.status === "booked") {
      text = "Booked";
    }
    return text;
  };

  return (
    <>
      {data.map((d) => (
        <Grid item key={d.id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{}}>
            <CardContent>
              <Typography variant="h6" color="green">
                {d.futsalName}, {d.location}
              </Typography>
              <Typography variant="h6" color="orange">
                {d.date}
              </Typography>
              <Typography variant="body2" color="purple">
                Time : {d.startTime} - {d.endTime}
              </Typography>
              <Typography variant="body2" color="red">
                Price : {d.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button color={getButtonColor(d)} size="small">
                {getButtonText(d)}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default MatchCard;
