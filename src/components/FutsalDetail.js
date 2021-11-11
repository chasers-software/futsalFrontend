import React from "react";

const FutsalDetail = (props) => {
  return (
    <>
      <h1>Futsal Detail</h1>
      <li>Futsal Name: {props.location.state.futsalName}</li>
      <li>Futsal Id: {props.location.state._id}</li>
    </>
  );
};

export default FutsalDetail;
