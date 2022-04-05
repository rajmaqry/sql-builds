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
import ListDividers from "./lists";
import Modal from "@mui/material/Modal";
import StorageIcon from "@mui/icons-material/Storage";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { LighterListItem } from "./lists";
const tableModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
let tables: string[] = [];
let tables_items = ["abc", "ccs", "asas"];
let databaseListItem = [];
export default function BasicCard() {
  let points: ITableMap = JSON.parse(
    fs.readFileSync("../../smpl.json", "utf8")
  );
  const [openTableModal, setOpenTableModal] = React.useState(false);
  const handleTableModalClose = () => {
    setOpenTableModal(false);
  };
  const renderTableSelection = () => {
    setOpenTableModal(true);
  };
  const [selectedDatabase, setSelectedDatabase] = React.useState<string>();
  const [databaseTableMap, setDatabaseTableMap] = React.useState<{
    [dbName: string]: string[];
  }>({});
  const handleSelectDatabase = (e) => {
    const dbName = e.target.id;
    if (dbName.length === 0) return;
    setSelectedDatabase(dbName);
  };
  const buildDBItem = (dbName) => {
    return (
      <>
        <MuiListItem
          id={dbName}
          sx={{
            paddingBottom: "0px !important",
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            paddingTop: "0px !important"
          }}
        >
          <ListItemIcon id={dbName}>
            <StorageIcon id={dbName} />
          </ListItemIcon>
          <ListItemText id={dbName}>
            <Typography
              variant="h7"
              component="div"
              color="#0097a7"
              id={dbName}
              sx={{ width: "100%" }}
            >
              {dbName}
            </Typography>
          </ListItemText>
        </MuiListItem>
      </>
    );
  };
  React.useEffect(() => {
    if (!points) return;
    const newDatabaseTableMap: { [dbName: string]: string[] } = {};
    for (const table_key in points) {
      const dbName = points[table_key].database_name;
      const tableName = points[table_key].table_name;
      if (!(dbName in newDatabaseTableMap)) {
        newDatabaseTableMap[dbName] = [];
        databaseListItem.push(buildDBItem(dbName));
      }
      newDatabaseTableMap[dbName].push(tableName);
    }
    setDatabaseTableMap(newDatabaseTableMap);
  }, []);

  const renderTables = () => {
    const tables = databaseTableMap[selectedDatabase];
    return (
      <List sx={{ width: "100%" }} component="nav" aria-label="mailbox folders">
        <Divider />
        {tables?.length > 0 &&
          tables.map((table, index) => (
            <>
              <LighterListItem
                id={table}
                button
                style={
                  index % 2
                    ? { background: "#b2ebf2" }
                    : { background: "#e0f7fa" }
                }
                onClick={selectTable}
              >
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="h7"
                    component="div"
                    color="#0097a7"
                    sx={{ width: "100%" }}
                  >
                    {table}
                  </Typography>
                </ListItemText>
              </LighterListItem>
              <Divider />
            </>
          ))}
        {tables?.length === 0 && (
          <>
            <Divider />
            <LighterListItem button>
              <ListItemText
                sx={{ "align-items": "center", "text-align": "center" }}
                primary="( Empty )"
              />
            </LighterListItem>
            <Divider />
          </>
        )}
      </List>
    );
  };

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

  const renderTables1 = () => {
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
                <Grid
                  item
                  xs={4}
                  sx={{
                    paddingTop: "1px !important",
                    paddingRight: "4px !important"
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    color="text.secondary"
                  >
                    Tables{" "}
                  </Typography>
                  <ListDividers items={tables_items} />
                  <Button variant="contained" onClick={renderTableSelection}>
                    + Add Table
                  </Button>
                </Grid>

                <Divider orientation="vertical" flexItem />
                <Grid item xs={6}>
                  xs=4
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </Box>

      <Modal
        open={openTableModal}
        onClose={handleTableModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={tableModalStyle}>
          <Typography variant="h6" component="div" color="text.secondary">
            Select Database
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: "5px !important" }}>
            <Grid
              item
              xs={4}
              sx={{
                paddingTop: "5px !important",
                paddingRight: "4px !important"
              }}
            >
              <ListDividers
                items={databaseListItem}
                onClick={handleSelectDatabase}
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={7}>
              {selectedDatabase?.length > 0 && <p>{renderTables()}</p>}
              xs=4
            </Grid>
          </Grid>
        </Box>
      </Modal>

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
