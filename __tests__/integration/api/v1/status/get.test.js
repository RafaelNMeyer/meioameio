import orchestrator from "__tests__/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe('GET api/v1/status', () => {
  describe('anonymous user', () => {
    it('retrieving current system status', async () => {

      const res = await fetch("http://localhost:3000/api/v1/status");
      expect(res.status).toBe(200);
      const response_body = await res.json();

      expect(response_body.active_connections).toBeDefined();
      expect(response_body.active_connections).toEqual(1);

      expect(response_body.max_connections).toBeDefined();
      expect(response_body.max_connections).toEqual(100);

      expect(response_body.db_version).toBeDefined();
      expect(response_body.db_version).toEqual("16.3 (Debian 16.3-1.pgdg120+1)");

      expect(response_body.updated_at).toBeDefined();
      expect(response_body.updated_at).toEqual(
        new Date(response_body.updated_at).toISOString(),
      );
    })
  })
})

