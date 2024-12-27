import db from "infra/database.js"
import node_pg_migrate from "node-pg-migrate";
import { resolve } from "node:path";

export default async function migrations(req, res) {
  const client = await db.getNewClient();
  try {
    let dryRun = false;
    if (req.method === "POST") {
    } else if (req.method === "GET") {
      dryRun = true;
    } else {
      res.status(403).json({ "Message": "Method not allowed" });
    }

    let m = await node_pg_migrate({
      dbClient: client,
      dir: resolve("infra", "migrations"),
      dryRun: dryRun,
      verbose: true,
      direction: "up",
      migrationsTable: "pgmigrations"
    });

    res.status(200).json(m);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "Message": "Error" });
  } finally {
    await client.end();
  }
}
