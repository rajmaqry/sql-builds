
import React, { KeyboardEvent, ReactNode, useContext, useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CustomizedInput from "./input";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import StorageIcon from "@mui/icons-material/Storage";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import TableChartIcon from "@mui/icons-material/TableChart";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "./sample.scss";
import ListDividers from "./lists";
import { LighterListItem } from "./lists";
import { ISqlSetting, ITableMap, ITableRelationship } from "./points"
import text from './smpl.json';
import { getInfoFromTableColumnKey, getInfoFromTableKey } from "./utils"
import { IBasicTabProps, BasicTabs } from "./tabs"
export interface ITableLibraryProps {
    selected?: string[]
    open: boolean
    onClose: (event, reason) => any
    onTableClick?: (tableKey: string, databaseName?: string, tableName?: string) => any
    onDatabaseClick?: (databaseName: string) => any
    onChange?: (selectedTables: string[]) => any
}
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

let databaseListItem: { [dbName: string]: any } = {};
let dbLists: string[] = []
export const DataTableLibrary: React.FC<ITableLibraryProps> = (props) => {

    let tables_info: ITableMap = text;

    const [selectedDatabase, setSelectedDatabase] = React.useState<string>();
    const [databaseTableMap, setDatabaseTableMap] = React.useState<{ [dbName: string]: string[]; }>({});

    React.useEffect(() => {
        if (!tables_info) return;
        const newDatabaseTableMap: { [dbName: string]: string[] } = {};
        for (const table_key in tables_info) {
            const { database, tableName } = getInfoFromTableKey(table_key);
            if (!(database in databaseListItem)) {
                databaseListItem[database] = database;
                dbLists.push(build_db_items(database))
            }
            if (!(database in newDatabaseTableMap)) {
                newDatabaseTableMap[database] = [];
            }
            newDatabaseTableMap[database].push(table_key);
        }
        setDatabaseTableMap(newDatabaseTableMap);
    }, [tables_info, props.open]);

    const build_db_items = (dbName: string) => {
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
    const select_database = (e) => {
        const dbName = e.target.id;
        if (dbName.length === 0) return;
        setSelectedDatabase(dbName);
    }
    const select_table = (e, selectedTables: Set<string>, table_key: string) => {
        if (selectedTables.has(table_key)) {
            selectedTables.delete(table_key)
        } else {
            selectedTables.add(table_key)
        }
        if (props.onChange) {
            props.onChange(Array.from(selectedTables))
        }

        if (props.onTableClick) {
            props.onTableClick(table_key)
        }
    }
    const render_tables = () => {
        if (!databaseTableMap || Object.keys(databaseTableMap).length === 0) {
            return null
        }
        const tables_keys: string[] = databaseTableMap[selectedDatabase];
        const selectedTables = new Set(props.selected)
        return (
            <>
                
                <Typography variant="h7" component="div" color="text.secondary">
                    Select Tables
                </Typography>
                <Divider
                    sx={{
                        paddingBottom: "4px !important"
                    }}
                />
                <List sx={{ width: "100%" }} component="nav" aria-label="mailbox folders">

                    {tables_keys?.length > 0 &&
                        tables_keys.map((table_key, index) => (
                            <div>
                                <LighterListItem
                                    selected={selectedTables.has(table_key)}
                                    id={table_key}
                                    button
                                    style={
                                        index % 2
                                            ? { background: "#e1f5fe" }
                                            : { background: "#b3e5fc" }
                                    }
                                    onClick={(e) => select_table(e, selectedTables, table_key)}
                                >
                                    <ListItemIcon id={table_key}>
                                        <TableChartIcon id={table_key} />
                                    </ListItemIcon>
                                    <ListItemText id={table_key}>
                                        <Typography
                                            id={table_key}
                                            variant="h7"
                                            component="div"
                                            color="#0097a7"
                                            sx={{ width: "100%" }}
                                        >
                                            {table_key.split('.')[1]}
                                        </Typography>
                                    </ListItemText>
                                </LighterListItem>
                                <Divider
                                    sx={{
                                        paddingTop: "5px !important",
                                        paddingBottom: "4px !important"
                                    }}
                                />
                            </div>
                        ))}
                    {tables_keys?.length === 0 && (
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
            </>
        );
    };
    const render_selection_tabs = () => {
        const tabPanels = []
        tabPanels.push(
            <Grid container spacing={2} sx={{ paddingTop: "5px !important" }}>
                <Grid
                    item
                    xs={4}
                    sx={{
                        paddingTop: "5px !important",
                        paddingRight: "10px !important"
                    }}
                >
                    <Typography variant="h7" component="div" color="text.secondary">
                        Select Database
                    </Typography>
                    <ListDividers
                        items={dbLists}
                        onClick={(e) => select_database(e)}
                    />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid
                    item
                    xs={7}
                    sx={{
                        paddingTop: "5px !important",
                        paddingRight: "4px !important"
                    }}
                >
                    {selectedDatabase?.length > 0 && <>{render_tables()}</>}
                </Grid>
            </Grid>)
        tabPanels.push(
            <Grid container spacing={2} sx={{ paddingTop: "5px !important" }}>
                <Grid
                    item
                    xs={10}
                    sx={{
                        paddingTop: "5px !important",
                        paddingRight: "10px !important"
                    }}
                >
                    <ListDividers
                        items={dbLists}
                    />
                </Grid>
            </Grid>
        )
        return (<BasicTabs numTabs={2} labels={['Tables', 'Views']} tabPanels={tabPanels} />)
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
                        Select Tablse or Views
                    </Typography>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                {render_selection_tabs()}
            </Box>
        </Modal>);
}