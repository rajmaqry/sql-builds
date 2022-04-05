import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ITableMap, ITable } from "./points";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import * as fs from "fs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import "./sample.scss";
import CustomizedInput from "./input";
import Grid from "@mui/material/Grid";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
let tables: string[] = [];
export default function BasicCard() {
  let points: ITableMap = JSON.parse(
    fs.readFileSync("../../smpl.json", "utf8")
  );
  let remPoints: ITableMap = points;
  const [tableName, setTableName] = React.useState("");
  const remTableIng = [];
  const handleTableSelect = (e) => {
    setTableName(e.target.value);
  };
  const tableSelect = (e) => {
    tables.push(e.target.id);
  };
  const renderOtherTables = (props) => {
    return (
      <div>
        <TextField
          id={tableName}
          select
          label="Select"
          value={tableName}
          onChange={handleTableSelect}
          helperText=""
        >
          {Object.keys(remPoints).map((p) => (
            <MenuItem
              id={points[p].table_key}
              value={points[p].table_name}
              onClick={tableSelect}
            >
              {points[p].table_name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  };
  const showOption = () => {
    for (let i = 0, len = tables.length; i < len; i++) {
      console.log(tables[i]);
      delete remPoints[tables[i]];
    }
    remTableIng.push(renderOtherTables(remTableIng));
    console.log(remTableIng);
  };

  const renderTables = () => {
    const toAdd = tables?.length == Object.keys(points).length ? false : true;
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { marginTop: "10px", width: "25ch" }
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id={tableName}
            select
            label="Select"
            value={tableName}
            onChange={handleTableSelect}
            helperText=""
          >
            {Object.keys(points).map((p) => (
              <MenuItem
                id={points[p].table_key}
                value={points[p].table_name}
                onClick={tableSelect}
              >
                {points[p].table_name}
              </MenuItem>
            ))}
          </TextField>

          {remTableIng[0]}

          {toAdd && (
            <>
              <span />
              <Button onClick={showOption}>
                <AddCircleIcon
                  fontSize="large"
                  sx={{ marginLeft: "10Px", color: "red" }}
                />
              </Button>
            </>
          )}
        </div>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 1000,
            height: 1000
          }
        }}
        justifyContent="center"
      >
        <Paper elevation={3}>
          <div class="paper-heading">
            <Typography variant="h5" component="div" color="#0097a7">
              SQL Settings
            </Typography>
          </div>
          <Divider variant="middle" />
          <div class="paper-heading">
            <CustomizedInput
              label="SQL Name"
              onChange={showOption}
              width="100%"
            />
          </div>
          <Divider variant="middle" sx={{ "padding-top": "40px" }} />
          <div class="row">
            <div class="row-1">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  xs=8
                </Grid>
                <Grid item xs={8}>
                  xs=4
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </Box>
      <Card sx={{ minWidth: 100 }}>
        <CardContent>
          <Typography variant="h5" component="div" color="text.secondary">
            SQL Settings
          </Typography>
          <Typography variant="h5" component="div">
            Pick Ingestions Points : {renderTables()}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}
