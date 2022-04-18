import * as React from "react";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { withStyles } from "@mui/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
const style = {
  width: "100%",
};
export const ContrastListItem = withStyles({
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
export const ChildListItem = withStyles({
  root: {
    "height":"10%",
    "&$selected": {
      backgroundColor: "red !important",
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
      "border-left": "4px solid #263238",
      "border-right": "4px solid #263238",
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
        color: "red"
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
      backgroundColor: "#26c6da !important",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "#00bcd4"
      }
    }
  },
  selected: {}
})(MuiListItem);
const stl = {};

export class CustomizedListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState((prevState) => ({
      open: !prevState.open
    }));
  }

  render() {
    return (
      <div>
        <ListItem
          key={this.props.key}
          button
          style={
            (this.props.index % 2
              ? { background: "#e0f7fa",height:"35px" }
              : { background: "#b2ebf2" ,height:"35px" })
          }
          onClick={this.props.onItemClick}>
          <ListItemIcon id={this.props.key} sx={{ "min-width": "40px" }}>
            {this.props.listItemIcon}
          </ListItemIcon>
          <ListItemText id={this.props.key}>
            <Typography
              id={this.props.key}
              variant="button"
              component="div"
              color="black"
              sx={{ width: "100%" }}
            >
              {this.props.header}
            </Typography>
          </ListItemText>
          <IconButton onClick={() => this.props.closeAction(this.props.key, this.props.index)}>
            <CloseIcon sx={{ "padding-right": "10px" }} />
          </IconButton>
          {this.state.open ? (
            <ExpandLessIcon onClick={this.handleClick} />
          ) : (
            <ExpandMoreIcon onClick={this.handleClick} />
          )}
        </ListItem>
        {this.props.children &&
          <Collapse
            key={this.props.key}
            in={this.state.open}
            timeout="auto"
            unmountOnExit
          ><List component="li" disablePadding key={this.props.key}
            sx={{ "margin-left": "5px", "margin-right": "5px", "margin-bottom": "3px" ,"&:after": {"background":"grey"}}}>
              {this.props.children.map((child, index) => {
                return (
                  <>
                    <ChildListItem key={child.key}
                      button
                      style={
                        (
                          index % 2
                            ? { background: "#bbdefb", height: '30px',"border-radius": "2px" }
                            : { background: "#e3f2fd" , height: '30px', "border-radius": "2px"})
                      }
                      onClick={child.onClick}
                      selected={child.isSelected}>
                      {child.item}
                    </ChildListItem>
                    <Divider /></>
                );
              })}
            </List>
          </Collapse>}
        <Divider />
      </div>
    );
  }
}
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
                    ? { background: "#e0f7fa" }
                    : { background: "#b2ebf2" })
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

export function ListDividerExpanding(props) {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <Divider />
      {props.items.length > 0 &&
        props.items.map((item, index) => (
          <>
            <ContrastListItem
              key={item}
              button
              style={
                ({ "&:hover": { "border-radius": "5px", border: "1px" } },
                  index % 2
                    ? { background: "#e0f7fa" }
                    : { background: "#b2ebf2" })
              }
              onClick={props.onClick}
            >
              {item}
            </ContrastListItem>
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
