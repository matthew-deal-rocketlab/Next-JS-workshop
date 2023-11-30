/*
pnpm init
pnpm add pg
*/

const TABLE_NAMES = ['tbl_user', 'tbl_user_detail', 'tbl_collection', 'tbl_site'];
const CRUD_TABLES = ['tbl_collection', 'tbl_site'];


const COMMENT1 = "// DO NOT EDIT.  This is a generated file created with ./run api-update-models\n"

const { Client } = require("pg");
const prnt = console.log;

const useSSL = process.env.DB_SSL === "false" ? "disable" : "prefer"; // or 'required'
const PG_PASS_ENCODED = encodeURIComponent(process.env.DB_PASSWORD);
const PG_URL = `postgres://${process.env.DB_USER}:${PG_PASS_ENCODED}` +
  `@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?sslmode=${useSSL}`;

// prnt(PG_URL);

// Maps postgres types to javascript types
function mapType(fieldType) {
  switch (fieldType) {
    case 'uuid':
    case 'json':
    case 'varchar':
    case 'text':
      return 'string';
    case 'int4':
      return 'number';
    case 'timestamp':
    case 'timestamptz':
      return 'object';
    default:
      return `UNKNOWN:${fieldType}`;
  }
}

async function sqlquery(client, sql, parameters) {
  let res1 = null
  try {
    res1 = await client.query(sql, parameters);
  } catch (e) {
    prnt(e);
  };
  return res1;
}


function getTable(tableName, rows) {
  table_def = `  ${tableName}: {\n`
  for (var i = 0; i < rows.length; i++) {
    const row = rows[i]
    table_def += `    ${row['column_name']}: '${mapType(row['udt_name'])}',\n`;
  }
  table_def += "  }";

  return table_def
}

async function generateModels() {
  const SQL_GETMODEL = "SELECT column_name, udt_name FROM information_schema.columns WHERE table_name = $1;"

  const client = new Client({ connectionString: PG_URL });
  await client.connect();

  var newFileContent = COMMENT1;

  // create models for all table
  newFileContent += "\nexport const ALL_TABLES: StringStringMap = {\n"
  for (var i = 0; i < TABLE_NAMES.length; i++) {
    const tableName = TABLE_NAMES[i];
    // prnt(`Getting ${tableName}`);
    const res1 = await sqlquery(client, SQL_GETMODEL, [tableName])
    if (res1 !== null && res1.rowCount > 0) {
      newFileContent += getTable(tableName, res1.rows);
      newFileContent += ',\n'; // (i> 0 ? ',\n' : '');
    }
  }

  await client.end();

  newFileContent += "}\n\n"

  // Link models for CRUD tables
  newFileContent += "export const CRUD_TABLES: StringStringMap = {\n"
  for (var j = 0; j < CRUD_TABLES.length; j++) {
    const crudTable = CRUD_TABLES[j];
    newFileContent += `  ${crudTable}: ALL_TABLES['${crudTable}'] ?? '',\n`;
  }
  newFileContent += "}";

  prnt(newFileContent);
}


async function main() {
  const command = process.argv[2];
  if (command === 'gen') await generateModels();
}

main();