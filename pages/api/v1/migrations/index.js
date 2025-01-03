import db from "infra/database.js";
import node_pg_migrate from "node-pg-migrate";
import { resolve } from "node:path";

export default async function migrations(req, res) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(req.method))
    res.status(403).json({ Message: "Method not allowed", Method: req.method });

  const client = await db.getNewClient();
  try {
    let config = {};
    switch (req.method) {
      case "GET":
        config = {
          dryRun: true,
          verbose: true,
        };
        break;
      case "POST":
        config = {
          dryRun: false,
        };
        break;
    }

    let m = await node_pg_migrate({
      dbClient: client,
      dir: resolve("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      ...config,
    });

    res.status(200).json(m);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Message: "Error to process migrations", Error: err });
  } finally {
    await client.end();
  }
}
