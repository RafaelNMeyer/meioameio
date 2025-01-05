import orchestrator from "__tests__/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET api/v1/migrations", () => {
  describe("executing dryRun migrations", () => {
    it("for the first time", async () => {
      const res = await fetch("http://localhost:3000/api/v1/migrations");
      expect(res.status).toBe(200);
      const res_body = await res.json();
      expect(res_body.length).toBeGreaterThanOrEqual(1);
    });
    it("for the second time", async () => {
      const res = await fetch("http://localhost:3000/api/v1/migrations");
      expect(res.status).toBe(200);
      const res_body = await res.json();
      expect(res_body.length).toBeGreaterThanOrEqual(1);
    });
  });
});
