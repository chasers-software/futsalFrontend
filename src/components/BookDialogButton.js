import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import { configure } from "@testing-library/dom";

export default function AlertDialog({ match }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBook = async () => {
    try {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(
        `/matches/book/${match._id}`,
        {},
        config
      );
      console.log(data.msg);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    //close dialog
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button variant="outlined" size="small" onClick={handleClickOpen}>
          Book Now
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle color="red" id="alert-dialog-title">
            {"Are you sure you want to book this match?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText color="green" id="alert-dialog-description">
              {"Once booked, cannot be unbooked"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="info" onClick={handleBook} autoFocus>
              Book
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
