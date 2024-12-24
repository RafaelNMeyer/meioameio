import db from "infra/database.js";

export default async function Status(req, res) {
  try {
    const con = await db.query("SELECT count(*) FROM pg_stat_activity WHERE state='active'");
    console.log(con);
    const max_con = await db.query("SHOW max_connections");
    res.status(200).json({
      active_connections: con[0].count,
      max_connections: max_con[0].max_connections
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
}
