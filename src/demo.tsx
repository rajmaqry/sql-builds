import * as React from "react";
import { ITableMap, ITable, ISqlSetting } from "./points";
import "./sample.scss";
import { SqlSetting } from "./DataSQLBuilder"
import { ConsoleSqlOutlined } from "@ant-design/icons";


const DEFAULT_SQL_SETTINGS: ISqlSetting = {
  sql_name: "Provide SQL Name",
  description: "",
  tables: [],
  tables_relationship: []
}
export default function BasicCard() {
  const [localSqlSettings, setLocalSqlSettings] = React.useState<ISqlSetting>({
    sql_name: "Provide SQL Name",
    description: "",
    tables: [],
    tables_relationship: []
  })

  React.useEffect(() => {
    console.log('loading::' + JSON.parse(JSON.stringify(DEFAULT_SQL_SETTINGS)))
    setLocalSqlSettings(JSON.parse(JSON.stringify(DEFAULT_SQL_SETTINGS)))
  }, [])

  return (
    <SqlSetting value={localSqlSettings} onChange={setLocalSqlSettings} />
  );
}
