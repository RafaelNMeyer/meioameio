import db from "infra/database.js";
import { InternalServerError } from "infra/errors.js";

export default async function Status(_, res) {
  try {
    const con = await db.query(
      "SELECT count(*) FROM pg_stat_activity WHERE state='active'",
    );
    const max_con = await db.query("SHOW max_connections");
    const db_version = await db.query(
      "SELECT setting FROM pg_settings WHERE name = 'server_version';",
    );

    res.status(200).json({
      active_connections: Number(con[0].count),
      max_connections: Number(max_con[0].max_connections),
      db_version: db_version[0].setting,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    const publicError = new InternalServerError({ cause: err });
    console.log(publicError);
    res.status(500).json(publicError);
  }
}
