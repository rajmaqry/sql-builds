import * as React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MuiListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { withStyles } from "@mui/styles";
const style = {
  width: "100%"
};
export const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "red",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "purple",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "#00bcd4 !important"
      }
    },
    "&:hover": {
      "border-radius": "4px",
      "border-left": "4px solid rgb(240, 103, 103)",
      backgroundColor: "blue",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "#00bcd4 !important"
      }
    }
  },
  selected: {}
})(MuiListItem);
export const LighterListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#e0f7fa !important",
      color: "white !important",
      "& .MuiListItemIcon-root": {
        color: "white"
      },
      "& .MuiListItemText-root": {}
    },
    "&$selected:hover": {
      backgroundColor: "#b2ebf2 !important",
      color: "white !important",
      "& .MuiListItemIcon-root": {
        color: "#304ffee"
      }
    },
    "&:hover": {
      "border-radius": "4px",
      "border-left": "4px solid rgb(240, 103, 103)",
      backgroundColor: "#4dd0e1",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "#00bcd4"
      }
    }
  },
  selected: {}
})(MuiListItem);
const stl = {};

export default function ListDividers(props) {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <Divider />
      {props.items.length > 0 &&
        props.items.map((item, index) => (
          <>
            <ListItem
              key={item}
              button
              style={
                ({ "&:hover": { "border-radius": "5px", border: "1px" } },
                index % 2
                  ? { background: "#b2dfdb" }
                  : { background: "#80cbc4" })
              }
              onClick={props.onClick}
            >
              {item}
            </ListItem>
            <Divider />
          </>
        ))}
      {props.items.length === 0 && (
        <>
          <Divider />
          <ListItem button>
            <ListItemText
              sx={{ "align-items": "center", "text-align": "center" }}
              primary="( Empty )"
            />
          </ListItem>
          <Divider />
        </>
      )}
    </List>
  );
}
