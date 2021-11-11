import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const FutsalCard = ({ data }) => {
  return (
    <>
      {data.map((d) => (
        <Grid item key={d._id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{}}>
            {/* This is used to insert futsal pitch image */}
            <CardMedia
              component="img"
              height="140"
              image={d.futsalImage}
              alt="futsal pitch image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {d.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {d.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {d.prime}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">{d.time.start}-{d.time.end}</Typography> */}
            </CardContent>
            <CardActions>
              <Button size="small">Book Now</Button>
              <Button
                component={Link}
                to={{ pathname: `futsalDetail/${d._id}`, state: d }}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default FutsalCard;
