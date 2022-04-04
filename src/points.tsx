export interface ITable {
  table_key: string;
  table_name: string;
  ingestion_id: string;
  database_name: string;
  description?: string;
  columns?: ITableColumn[];
  partitions?: string[];
  partition_key?: string;
}

export interface ITableColumn {
  column_name: string;
  column_type: string;
  values?: string[];
}

export interface ITableMap {
  [tableKey: string]: ITable | null;
}

export interface ITableRelationship {
  left_table_column_key: string;
  right_table_column_key: string;
  join_type: string;
}
