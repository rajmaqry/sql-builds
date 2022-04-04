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
          {remTableIng.length > 0 &&
            Array.from(Array(remTableIng)).map((c, index) => {
              return <>{remTableIng[index]}</>;
            })}
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
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Build your SQL
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
  );
}
