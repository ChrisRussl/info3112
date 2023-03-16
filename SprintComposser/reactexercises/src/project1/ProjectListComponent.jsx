import React, { useState, useEffect, useReducer } from "react";
import {
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
const AdvisoryListComponent = (props) => {
  const { GRAPHURL, setState } = props;

  const [options, setOptions] = useState([]);
  const [tableArr, setTableArr] = useState([]);
  const [currentSelect, setCurrentSelect] = useState(null);

  let firstTime = true;
  useEffect(() => {
    if (firstTime) {
      fetchProjects();
      firstTime = false;
    }
  }, []);

  const fetchProjects = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load data from server...",
      });
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            "query{projects{_id,name,teamName,productName,startDate,hoursPerPoint,estimatedPoint,estimatedCost}}",
        }),
      });
      let json = await response.json();

      //   let formatedArray = json.data.projects.filter(function (s) {
      //     return s && s.trim();
      //   });

      let formatedArray = json.data.projects.map((item) => {
        let obj = {
          _id: item._id,
          name: item.name,
          teamName: item.teamName,
          productName: item.productName,
          startDate: item.startDate,
          hoursPerPoint: item.hoursPerPoint,
          estimatedPoint: item.estimatedPoint,
          estimatedCost: item.estimatedCost,
        };
        return obj;
      });
      setState({
        snackBarMsg: `found ${formatedArray.length} projects`,
        contactServer: true,
      });
      setOptions(formatedArray);
      setTableArr(formatedArray);
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  return (
    <CardContent>
      {/* Content Start */}
      <p></p>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 650, maxHeight: 200 }}
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  // style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}
                  style={{ fontWeight: "bold" }}
                >
                  Project
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Team</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Product</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Start Date</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Hours Per Point
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Estimated Point
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Estimated Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableArr.map((row) => (
                <TableRow key={row._id} sx={{}}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.teamName}</TableCell>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.hoursPerPoint}</TableCell>
                  <TableCell>{row.estimatedPoint}</TableCell>
                  <TableCell>{row.estimatedCost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Content End */}
    </CardContent>
  );
};
export default AdvisoryListComponent;
