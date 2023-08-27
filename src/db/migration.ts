import { DBTable } from "./tables";

async function main() {
  const dbTables = new DBTable();
  // user table migration
  await dbTables.userTable();

  // exist process
  process.exit(0);
}
main();
