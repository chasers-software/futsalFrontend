import React from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";

import BookDialogButton from "./BookDialogButton";

const MatchCard = ({ data }) => {
  const getBookButton = (match) => {
    let button = <BookDialogButton match={match} />;
    if (match.status === "booked") {
      button = (
        <Typography gutterBottom variant="button" color="red">
          Booked
        </Typography>
      );
    }
    return button;
  };

  return (
    <>
      {data?.map((d) => (
        <Grid item key={d._id} xs={12} sm={6} md={4} lg={3}>
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
            <CardActions>{getBookButton(d)}</CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default MatchCard;
