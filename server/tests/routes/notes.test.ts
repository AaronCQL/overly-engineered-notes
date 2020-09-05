import request from "supertest";
import server from "../../src/services/serverService";
import { initDb, closeDb } from "../../src/services/dbService";

beforeAll(async (done) => {
  // initialise the testing DB before starting
  await initDb();
  done();
});

afterAll(async (done) => {
  // close the DB connection before ending
  await closeDb();
  done();
});

describe("GET request", () => {
  it("should return 200 and an array of notes", async () => {
    const res = await request(server).get("/notes").send();

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.status).toEqual(200);
  });
});

describe("POST request", () => {
  it("should return 400 if 'text' parameter is missing", async () => {
    const res = await request(server).post("/notes").send();

    expect(res.status).toEqual(400);
  });

  it("should return 400 if 'text' paramter is invalid", async () => {
    const invalidData = { text: " " };
    const res = await request(server).post("/notes").send(invalidData);

    expect(res.status).toEqual(400);
  });

  it("should return 201 and the inserted data", async () => {
    const validData = { text: "hello!" };
    const res = await request(server).post("/notes").send(validData);

    expect(res.status).toEqual(201);
    expect(res.body.text).toEqual(validData.text);
  });
});

describe("PUT request", () => {
  //* NOTE: this objectId is invalid on purpose
  const invalidObjectId = "123";

  it("should return 400 if 'text' parameter is missing", async () => {
    const res = await request(server).put(`/notes/${invalidObjectId}`).send();

    expect(res.status).toEqual(400);
  });

  it("should return 400 if 'text' parameter is invalid", async () => {
    const invalidData = { text: " " };
    const res = await request(server)
      .put(`/notes/${invalidObjectId}`)
      .send(invalidData);

    expect(res.status).toEqual(400);
  });

  it("should return 404 if document is not found", async () => {
    const validData = { text: "hello" };
    const res = await request(server)
      .put(`/notes/${invalidObjectId}`)
      .send(validData);

    expect(res.status).toEqual(404);
  });
});

describe("DELETE request", () => {
  //* NOTE: this objectId is invalid on purpose
  const invalidObjectId = "123";

  it("should return 404 if document is not found", async () => {
    const res = await request(server)
      .delete(`/notes/${invalidObjectId}`)
      .send();

    expect(res.status).toEqual(404);
  });
});
