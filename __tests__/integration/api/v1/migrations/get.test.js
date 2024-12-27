import orchestrator from "__tests__/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe('GET api/v1/migrations', () => {
  describe('anonymous user', () => {
    it('executing migrations dryRun', async () => {

      const res = await fetch("http://localhost:3000/api/v1/migrations");
      expect(res.status).toBe(200);
      const res_body = await res.json();
      expect(res_body.length).toBeGreaterThanOrEqual(1)

      const res2 = await fetch("http://localhost:3000/api/v1/migrations");
      expect(res2.status).toBe(200);
      const res2_body = await res2.json();
      expect(res2_body.length).toEqual(1)
    })
  })
})

