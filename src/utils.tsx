interface ITableColumnKeyInfo {
    database: string
    tableName: string
    tableKey: string
    columnName: string
}
interface ITablekeyInfo {
    database: string
    tableName: string
    tableKey: string
}

export const getInfoFromTableColumnKey = (tableColumnKey: String): ITableColumnKeyInfo => {
    if (!tableColumnKey || tableColumnKey.length === 0) {
        throw new SyntaxError(`'${tableColumnKey}' is not a valid tableColumnKey`)
    }

    const parts = tableColumnKey.split('.')
    if (parts.length < 3) {
        throw new SyntaxError(`'${tableColumnKey}' is not a valid tableColumnKey`)
    } else {
        let columnName = parts[2]
        if (columnName.startsWith('"')) {
            columnName = columnName.slice(1, columnName.length - 1)
        }
        return {
            database: parts[0],
            tableName: parts[1],
            tableKey: parts[0] + '.' + parts[1],
            columnName,
        }
    }
}
export const getInfoFromTableKey = (tableKey: String): ITablekeyInfo => {
    if (!tableKey || tableKey.length === 0) {
        throw new SyntaxError(`'${tableKey}' is not a valid tableColumnKey`)
    }
    const parts = tableKey.split('.')
    if (parts.length < 2) {
        throw new SyntaxError(`'${tableKey}' is not a valid tableColumnKey`)
    } else {
        return {
            database: parts[0],
            tableName: parts[1],
            tableKey: parts[0] + '.' + parts[1]
        }
    }
}