import retry from "async-retry";
import database from "infra/database.js";

require("dotenv").config({ path: ".env.development" });

async function clearDatabase() {
  try {
    await database.query("drop schema public cascade; create schema public;");
  } catch (err) {
    console.log(err);
  }
}

async function waitForAllServices() {
  await retry(async () => {
    const res = await fetch("http://localhost:3000/api/v1/status");
    if (res.status !== 200) throw new Error();
  }, {});
}

const orchestrator = {
  clearDatabase,
  waitForAllServices,
};

export default orchestrator;
