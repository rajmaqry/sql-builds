
import React, { KeyboardEvent, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CustomizedInput from "./input";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ITableMap, ITableRelationship, ITable, IRenderCollapse, ITableColumn } from "./points"
import Tooltip from '@mui/material/Tooltip';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import SelectButton from "./SmallSelectButton"
import text from './smpl.json';
import { ChildListItem } from './lists';
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export interface ITableRelationshipEditorProps {
    open: boolean
    selectedTables?: string[]
    selected?: ITableRelationship[]
    onClose?: (event, reason) => any
    onChange?: (selectedTableRelationship: ITableRelationship[]) => any
}
const tableModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "700px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};
export const TableRelationshipEditor: React.FC<ITableRelationshipEditorProps> = (props) => {
    let tables_info: ITableMap = text;

    const [leftTable, setLeftTable] = React.useState("");
    const [rightTable, setRightTable] = React.useState("");
    const [joinType, setJointype] = React.useState("INNER");
    const [leftTableCol, setLeftTableCol] = React.useState<string | null>()
    const [rightTableCol, setRightTableCol] = React.useState<string | null>()
    const [leftTableInfo, setLeftTableInfo] = React.useState<ITable | null>(null)
    const [rightTableInfo, setRightTableInfo] = React.useState<ITable | null>(null)
    const [validRelation, setValidRelation] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (leftTable) {
            const tableInfo: ITable = tables_info[leftTable]
            setLeftTableInfo(tableInfo)
        }
    }, [leftTable])

    React.useEffect(() => {
        if (rightTable) {
            const tableInfo: ITable = tables_info[rightTable]
            setRightTableInfo(tableInfo)
        }
    }, [rightTable])

    React.useEffect(() => {
        if (leftTable === rightTable) {
            setValidRelation(false)
            //window.alert("Left table and right table are smae")
            return
        }
        if (leftTableCol && rightTableCol && leftTable && rightTable && joinType && leftTable.length > 0 && rightTable.length > 0 && joinType.length > 0) setValidRelation(true)
    }, [leftTable, rightTable, leftTableCol, rightTableCol])

    const selectJoinType = (
        event: React.MouseEvent<HTMLElement>,
        join: string) => {
        if (join) setJointype(join)
    }

    const saveRelationShip = () => {
        if (validRelation) {
            const tableRel: ITableRelationship = {
                left_table_column_key: leftTableCol,
                right_table_column_key: rightTableCol,
                join_type: joinType
            }
            if (props.onChange) {
                props.onChange([...(props.selected || []), tableRel])
            }
        }
    }
    const render_table_select = (isLeft: boolean) => {
        if (props.selectedTables && props.selectedTables.length >= 2) {
            const tableOp: { [key: string]: { text: string } } = {}
            props.selectedTables.map((table_key, index) => {
                tableOp[table_key] = { text: table_key.split(".")[1] }
            })
            const lable_id: string = isLeft ? 'left-table' : 'right-table'
            const callBack = isLeft ? setLeftTable : setRightTable
            const valueSelect = isLeft ? leftTable : rightTable
            const label = isLeft ? 'Left Table' : 'Right Table'
            return (
                <SelectButton
                    id={lable_id}
                    options={tableOp}
                    value={valueSelect}
                    onValueChange={callBack}
                    label={label}
                />
            )
        } else {
            return (<p style={{ "padding-left": "10px" }}>Please select atleast two tables to continue</p>)
        }
    }

    const render_columns_list = (isLeft: boolean) => {
        const tableSelect: ITable | null = isLeft ? leftTableInfo : rightTableInfo
        const tableSelectKey: string | null = isLeft ? leftTable : rightTable
        if (!tableSelect) return
        if (!tableSelect.columns) return
        const fieldSelect = isLeft ? setLeftTableCol : setRightTableCol
        const selected = isLeft ? leftTableCol : rightTableCol
        return (
            <>
                <List component="li" disablePadding key={tableSelectKey + '-schema'}
                    sx={{ "margin-left": "5px", "margin-right": "5px", "margin-bottom": "3px", "&:after": { "background": "grey" } }}>
                    {tableSelect.columns?.map((column: ITableColumn, index: number) => (
                        <ChildListItem key={tableSelectKey + '.' + column.column_name}
                            button
                            style={
                                (
                                    index % 2
                                        ? { background: "#bbdefb", height: '30px', "border-radius": "2px" }
                                        : { background: "#e3f2fd", height: '30px', "border-radius": "2px" })
                            }
                            onClick={(e) => fieldSelect(tableSelectKey + '.' + column.column_name)}
                            selected={selected === tableSelectKey + '.' + column.column_name}>

                            <ListItemIcon id={tableSelectKey + '.' + column.column_name} sx={{ "min-width": "40px", "padding-left": "20px", "padding-right": "10px" }}>
                                <AccountTreeIcon id={tableSelectKey + '.' + column.column_name} />
                            </ListItemIcon>
                            <ListItemText id={tableSelectKey + '.' + column.column_name}>
                                <Typography
                                    id={tableSelectKey + '.' + column.column_name}
                                    variant="button"
                                    component="div"
                                    color="black"
                                    sx={{ width: "100%" }}
                                >
                                    {column.column_name}
                                </Typography>
                            </ListItemText>
                        </ChildListItem>
                    ))}
                </List>
            </>
        )

    }


    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={tableModalStyle}>
                <div class="modal-header">
                    <Typography variant="h6" component="div" color="text.secondary">
                        Table Relationship
                    </Typography>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider
                    sx={{
                        paddingBottom: "4px !important"
                    }}
                />
                <Grid container spacing={2}
                    sx={{
                        paddingTop: "30px !important"
                    }}>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            paddingTop: "1px !important",
                            paddingRight: "4px !important"
                        }}
                    >
                        <Paper elevation={3} sx={{ height: "500px" }}>
                            <Typography
                                variant="h6"
                                component="div"
                                color="text.secondary"
                                sx={{ "padding-left": "10px", "padding-top": "5px" }}
                            >
                                Left Table
                            </Typography>
                            <Divider
                                sx={{
                                    paddingBottom: "4px !important"
                                }}
                            />
                            {render_table_select(true)}
                            <Divider
                                sx={{
                                    paddingBottom: "4px !important"
                                }}
                            />
                            {render_columns_list(true)}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}
                        sx={{
                            paddingTop: "1px !important",
                            paddingRight: "4px !important"
                        }}>
                        <Paper elevation={3} sx={{ height: "500px" }}>
                            <Typography
                                variant="h6"
                                component="div"
                                color="text.secondary"
                                sx={{ "padding-left": "10px", "padding-top": "5px" }}
                            >
                                Right Table
                            </Typography>
                            <Divider
                                sx={{
                                    paddingBottom: "4px !important"
                                }}
                            />
                            {render_table_select(false)}
                            <Divider
                                sx={{
                                    paddingBottom: "4px !important"
                                }}
                            />
                            {render_columns_list(false)}
                        </Paper>
                    </Grid>
                </Grid>
                <div class="modal-footer">
                    <ToggleButtonGroup
                        value={joinType}
                        exclusive
                        color="primary"
                        onChange={selectJoinType}
                        aria-label="text alignment"
                        sx={{ "padding-top": "20px" }}
                    >

                        <ToggleButton value="LEFT" aria-label="left aligned">
                            <Tooltip title="Left Outer Join" arrow>
                                <span>LEFT</span>
                            </Tooltip>
                        </ToggleButton>


                        <ToggleButton value="INNER" aria-label="centered">
                            <Tooltip title="Inner Join" arrow>
                                <span>INNER</span>
                            </Tooltip>
                        </ToggleButton>


                        <ToggleButton value="RIGHT" aria-label="right aligned">
                            <Tooltip title="Right Outer Join" arrow>
                                <span>RIGHT</span>
                            </Tooltip>
                        </ToggleButton>

                    </ToggleButtonGroup>
                    <Button variant="contained" onClick={() => saveRelationShip()}
                        sx={{ margin: "10px" }}>
                        Add
                    </Button>
                </div>
            </Box>
        </Modal >);

}