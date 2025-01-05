import pg from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const res = await client.query(queryObject);
    return res.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await client?.end();
  }
}

async function getNewClient() {
  const { Client } = pg;
  const client = new Client(getClientConfig());
  await client.connect();
  return client;
}

function getClientConfig() {
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = process.env.POSTGRES_PORT;
  const database = process.env.POSTGRES_DB;

  return {
    user,
    password,
    host,
    port,
    database,
    ssl: process.env.NODE_ENV == "production" ? true : false,
  };
}

const database = {
  query,
  getNewClient,
};

export default database;
