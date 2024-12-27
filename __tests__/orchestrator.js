import retry from "async-retry";

async function waitForAllServices() {
  await retry(async (bail) => {
    const res = await fetch("http://localhost:3000/api/v1/status");
    if (res.status !== 200)
      throw new Error();
  },
    {})
}

export default { waitForAllServices };
