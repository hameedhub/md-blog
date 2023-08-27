import { DBTable } from "./tables";

async function main() {
  const dbTables = new DBTable();
  // user table migration
  await dbTables.userTable();
  // post table migration
  await dbTables.postTable();

  // exist process
  process.exit(0);
}
main();
