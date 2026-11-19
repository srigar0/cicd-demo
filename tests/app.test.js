import assert from "node:assert/strict";
import { describe, it } from "mocha";
import request from "supertest";
import app from "../app.js";

describe("Express routes", () => {
  it("GET / returns the greeting", async () => {
    const response = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);

    assert.deepEqual(response.body, { message: "Hello from Render!" });
  });

  it("GET /health returns a healthy status", async () => {
    const response = await request(app)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200);

    assert.deepEqual(response.body, { status: "ok" });
  });

  it("an unknown route responds with 404", async () => {
    await request(app).get("/does-not-exist").expect(404);
  });
});
