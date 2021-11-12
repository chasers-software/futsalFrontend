import React from "react";
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
              image={d.image}
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
                {d.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {d.time.start}-{d.time.end}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Book Now</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default FutsalCard;
