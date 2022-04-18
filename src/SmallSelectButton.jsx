import React, { Component } from "react";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
function getStyles(i, theme) {
  return {
    fontWeight: i["Select"]
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium
  };
}

class SelectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.value
    };
  }

  render() {
    const handleChange = (e) => {
      this.props.onValueChange(e.target.value);
    };
    return (
      //<select defaultValue={this.props.value} onChange={(e) => handleChange(e)} className="feather-select">
      //     {Object.keys(this.props.options).map(i => <option className="feather-option" key={i} value={i} >{i.text}</option>)}
      //</select>
      <FormControl sx={{ m: 1, minWidth: 120 , width:"330px", "padding-left":"10px","padding-top":"5px",}} size="small">
      <InputLabel id={this.props.id} sx ={{"padding-bottom":"4px"}}>{this.props.label}</InputLabel>
      <Select
        labelId={this.props.id}
        id={this.props.id}
        value={this.props.value}
        onChange={(e) => handleChange(e)}
      >
        {Object.keys(this.props.options).map((i) => (
          <MenuItem key={i} value={i}>
            {this.props.options[i].text}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
    );
  }
}
export default SelectButton;
