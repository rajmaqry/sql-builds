import React, { KeyboardEvent, ReactNode, useContext, useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CustomizedInput from "./input";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import List from "@mui/material/List";
import TableChartIcon from "@mui/icons-material/TableChart";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import "./sample.scss";
import ListDividers from "./lists";
import { LighterListItem, CustomizedListItem } from "./lists";
import { ISqlSetting, ITableMap, ITableRelationship, ITable, IRenderCollapse, ITableColumn } from "./points"
import text from './smpl.json';
import { getInfoFromTableColumnKey, getInfoFromTableKey } from "./utils"
import { DataTableLibrary } from './DataTableLibrary';
import { TableRelationshipEditor } from "./DataTableRelationshipEditor";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import JoinRightIcon from '@mui/icons-material/JoinRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
export interface ISqlBuilderSettingProps {
    value: ISqlSetting
    onChange: (sqlSettings: ISqlSetting) => any
    children?: ReactNode
}

export const SqlSetting: React.FC<ISqlBuilderSettingProps> = (props) => {
    let tables_info: ITableMap = text;
    const [openTableModal, setOpenTableModal] = React.useState<boolean>(false)
    const [openTableRelEd, setOpenTableRelEd] = React.useState<boolean>(false)

    const remove_table = (table_key: string, index: number) => {
        if (props.value.tables && props.value.tables.length !== 0 && index !== -1) {
            let new_tables = [];
            props.value.tables.splice(index, 1)
            new_tables = props.value.tables
            props.onChange({
                ...props.value,
                tables: new_tables
            })
        }
        if (props.value.tables_relationship && props.value.tables_relationship.length > 0) {
            const table_rel: ITableRelationship[] = []
            props.value.tables_relationship.forEach((rel) => {
                const left_table = getInfoFromTableColumnKey(rel.left_table_column_key)
                const right_table = getInfoFromTableColumnKey(rel.right_table_column_key)
                if (left_table.tableKey != table_key && right_table.tableKey != table_key) {
                    table_rel.push(rel)
                }
            })
            props.onChange({ ...props.value, tables_relationship: table_rel })
        }
    }
    const render_table_schema = (table_key: string) => {
        if (!tables_info) {
            return
        }
        const table: ITable = tables_info[table_key]
        let schema_map: IRenderCollapse[] = []
        table.columns?.map((column: ITableColumn) => {
            const column_key = table_key + '.' + column.column_name
            schema_map.push({
                key: column_key, item:
                    <><ListItemIcon id={column_key} sx={{ "min-width": "40px", "padding-left": "20px", "padding-right": "10px" }}>
                        <AccountTreeIcon id={column_key} />
                    </ListItemIcon>
                        <ListItemText id={column_key}>
                            <Typography
                                id={column_key}
                                variant="button"
                                component="div"
                                color="black"
                                sx={{ width: "100%" }}
                            >
                                {column.column_name}
                            </Typography>
                        </ListItemText>
                        <IconButton>
                            <CloseIcon fontSize="small" />
                        </IconButton></>
            })
        })
        return schema_map;
    }

    const render_table_names_selected = () => {
        if (!props.value.tables || props.value.tables.length === 0) {
            return (<ListDividers items={[]} />);
        } else {
            return (
                <List sx={{
                    "width": "100%", "padding-bottom": "0px !important", "padding-left": "4px", "padding-right": "4px",
                    "-webkit-box-shadow": "0 8px 6px -6px black", "-moz-box-shadow": "0 8px 6px -6px black",
                    "box-shadow": "0 6px 6px -6px black"
                }} component="nav" aria-label="mailbox folders">
                    {props.value.tables.map((table_key, i) => (
                        <CustomizedListItem
                            key={table_key}
                            index={i}
                            listItemIcon={<TableChartIcon id={table_key} />}
                            header={table_key.split('.')[1]}
                            closeAction={() => remove_table(table_key, i)}
                            children={render_table_schema(table_key)}
                        />
                    ))}
                </List>
            )
        }
    }

    const render_tables_rel_created = () => {
        if (!props.value.tables_relationship || props.value.tables_relationship.length === 0) {
            return (<ListDividers items={[]} />);
        } else {
            const relItems: any = []
            props.value.tables_relationship.map((relation, index) => {
                console.log(relation)
                const [leftDbName, leftTableName, leftColumnName] = relation.left_table_column_key.split(".")
                const [rightDbName, rightTableName, rightColumnName] = relation.right_table_column_key.split(".")
                const leftColumn: string = leftTableName + "." + leftColumnName
                const rightColumn: string = rightTableName + "." + rightColumnName
                let joinIcon
                if (relation.join_type === 'INNER') joinIcon = <JoinInnerIcon sx={{ height: 38, width: 38 }} />
                if (relation.join_type === 'LEFT') joinIcon = <JoinLeftIcon sx={{ height: 38, width: 38 }} />
                if (relation.join_type === 'RIGHT') joinIcon = <JoinRightIcon sx={{ height: 38, width: 38 }} />
                relItems.push(
                    <Card sx={{ display: 'flex', "width": "100%" }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'center',
                            p: 1,
                            m: 1,
                            width: "100%",
                            height: "50px",
                            padding:"0px !important",
                            
                        }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Grid container spacing={2}>
                                    <Grid
                                        item
                                        xs={5}
                                    >
                                        <Chip icon={<LightbulbCircleIcon />} label={leftTableName + "." + leftColumnName} />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                    >
                                        <Tooltip title={relation.join_type} arrow>
                                            <IconButton aria-label="next">
                                                {joinIcon}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={5}
                                    >
                                        <Chip icon={<LightbulbCircleIcon />} label={rightTableName + "." + rightColumnName} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card >)
            })
            return (
                <ListDividers items={relItems} />
            )
        }
    }
    const handleTableModalClose = (event, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setOpenTableModal(false);
    }
    const handleRelEdModalClose = (event, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setOpenTableRelEd(false);
    }

    const onTableChange = (selectedTables: string[]) => {
        props.onChange({
            ...props.value,
            tables: selectedTables
        })
    }
    const onTableClick = (table_key: string, database_name?: string, table_name?: string) => {
        const table: ITable = tables_info[table_key]

    }
    const onTableRelChange = (selectedTableRelationship: ITableRelationship[]) => {
        props.onChange({
            ...props.value,
            tables_relationship: selectedTableRelationship,
        })
        setOpenTableRelEd(false);
    }

    return (<>
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    width: 1100,
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
                        label='SQL Name'
                        value={props.value.sql_name}
                        onChange={(e) =>
                            props.onChange({
                                ...props.value,
                                sql_name: e.target.value,
                            })}
                        width="100%"
                    />
                </div>
                <Divider variant="middle" sx={{ "padding-top": "40px" }} />
                <div class="row">
                    <div class="row-1">
                        <Grid container spacing={2}>
                            <Grid
                                item
                                xs={5}
                                sx={{
                                    paddingTop: "1px !important",
                                    paddingRight: "4px !important"
                                }}
                            >
                                <Paper elevation={3}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ "padding-left": "10px", "padding-top": "5px" }}
                                    >
                                        Tables
                                    </Typography>
                                    {render_table_names_selected()}
                                    <Button variant="contained" onClick={() => setOpenTableModal(true)}
                                        sx={{ margin: "10px" }}>
                                        + Add Table
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={7}
                                sx={{
                                    paddingTop: "1px !important",
                                    paddingRight: "4px !important"
                                }}>
                                <Paper elevation={3}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ "padding-left": "10px", "padding-top": "5px" }}
                                    >
                                        Table Relationships
                                    </Typography>
                                    {render_tables_rel_created()}
                                    <Button variant="contained" onClick={() => setOpenTableRelEd(true)}
                                        sx={{ margin: "10px" }}>
                                        + Add Table Relationship
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Paper>
        </Box>
        {props.children}
        <DataTableLibrary
            open={openTableModal}
            onClose={(event, reason) => handleTableModalClose(event, reason)}
            onChange={onTableChange}
            onTableClick={onTableClick}
            selected={props.value.tables}
        />
        <TableRelationshipEditor
            open={openTableRelEd}
            selectedTables={props.value.tables}
            selected={props.value.tables_relationship}
            onClose={(event, reason) => handleRelEdModalClose(event, reason)}
            onChange={onTableRelChange}
        />
    </>)

}