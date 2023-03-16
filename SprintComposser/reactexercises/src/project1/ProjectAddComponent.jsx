import React, { useEffect, useReducer, useState } from "react";

import {
  CardContent,
  Typography,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";

const Project1Component = (props) => {
  const { GRAPHURL, setState } = props;

  const [porjectName, setPorjectName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [productName, setProductName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [hoursPerPoint, setHoursPerPoint] = useState(0);
  const [estimatedPoint, setEestimatedPoint] = useState(0);
  const [estimatedCost, setEestimatedCost] = useState(0);

  const handlePorjectNameInput = (e) => {
    setPorjectName(e.target.value);
  };

  const handleTeamNameInput = (e) => {
    setTeamName(e.target.value);
  };

  const handleProductNameInput = (e) => {
    setProductName(e.target.value);
  };

  const handleStartDateInput = (e) => {
    setStartDate(e.target.value);
  };

  const handleHoursPerPointInput = (e) => {
    let parsedNumber = parseInt(e.target.value);
    if (parsedNumber < 0) {
      return;
    } else if (isNaN(parsedNumber)) {
      setHoursPerPoint(0);
      return;
    }
    setHoursPerPoint(parsedNumber);
  };

  const handleEstimatedPointInput = (e) => {
    let parsedNumber = parseInt(e.target.value);
    if (parsedNumber < 0) {
      return;
    } else if (isNaN(parsedNumber)) {
      setEestimatedPoint(0);
      return;
    }
    setEestimatedPoint(parsedNumber);
  };

  const handleEstimatedCost = (e) => {
    let parsedNumber = parseInt(e.target.value);
    if (parsedNumber < 0) {
      return;
    } else if (isNaN(parsedNumber)) {
      setEestimatedCost(0);
      return;
    }
    setEestimatedCost(parsedNumber);
  };

  const handelAddProject = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to add project...",
      });
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            "mutation($name: String, $teamName: String, $productName: String, $startDate: String, $hoursPerPoint: Int, $estimatedPoint: Int, $estimatedCost: Int) { addproject(name: $name teamName: $teamName productName: $productName startDate: $startDate hoursPerPoint: $hoursPerPoint estimatedPoint: $estimatedPoint estimatedCost: $estimatedCost) {name,teamName,productName,startDate,hoursPerPoint,estimatedPoint,estimatedCost} }",
          variables: {
            name: porjectName,
            teamName: teamName,
            productName: productName,
            startDate: startDate,
            hoursPerPoint: hoursPerPoint,
            estimatedPoint: estimatedPoint,
            estimatedCost: estimatedCost,
          },
        }),
      });
      let json = await response.json();
      if (json.data.addproject) {
        setState({
          snackBarMsg: `project added`,
          contactServer: true,
        });
      }
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem insert data - ${error.message}`,
      });
    }
  };

  const handelReset = () => {
    setPorjectName("");
    setTeamName("");
    setProductName("");
    setStartDate("");
    setHoursPerPoint(0);
    setEestimatedPoint(0);
    setEestimatedCost(0);
  };

  return (
    <CardContent>
      {/* Content Start */}
      <Typography
        variant="h6"
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        Add Project
      </Typography>
      <p></p>
      <TextField
        onChange={handlePorjectNameInput}
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "1vh",
        }}
        label="Project's name"
        value={porjectName}
      />

      <p></p>
      <TextField
        onChange={handleTeamNameInput}
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "1vh",
        }}
        label="Team name"
        value={teamName}
      />
      <p></p>
      <TextField
        onChange={handleProductNameInput}
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "1vh",
        }}
        label="Product name"
        value={productName}
      />

      <p></p>
      <TextField
        onChange={handleStartDateInput}
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "1vh",
        }}
        label="Start Date"
        value={startDate}
      />
      <TextField
        label="Hours per point"
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "1vh",
        }}
        onChange={handleHoursPerPointInput}
        value={hoursPerPoint}
      />
      <TextField
        label="Estimated story point"
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "1vh",
        }}
        onChange={handleEstimatedPointInput}
        value={estimatedPoint}
      />
      <TextField
        label="Estimated cost"
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "1vh",
        }}
        onChange={handleEstimatedCost}
        value={estimatedCost}
      />
      <Typography
        style={{
          justifyContent: "center",
          display: "flex",
          margin: 20,
        }}
      >
        <Button
          style={{ margin: "2vw" }}
          data-testid="addbutton"
          variant="contained"
          disabled={
            porjectName === "" ||
            teamName === "" ||
            productName === "" ||
            startDate === "" ||
            hoursPerPoint === 0 ||
            estimatedPoint === 0 ||
            estimatedCost === 0
          }
          onClick={handelAddProject}
        >
          Add PROJECT
        </Button>
        <Button
          style={{ margin: "2vw" }}
          data-testid="addbutton"
          variant="contained"
          onClick={handelReset}
        >
          RESET
        </Button>
      </Typography>
      {/* Content End */}
    </CardContent>
  );
};
export default Project1Component;
