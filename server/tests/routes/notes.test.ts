import request from "supertest";
import server from "../../src/services/serverService";
import { initDb, closeDb } from "../../src/services/dbService";

const API_ENDPOINT = "/api/notes";

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
  it("should return 200 and an array of notes", async (done) => {
    const res = await request(server).get(API_ENDPOINT).send();

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.status).toEqual(200);
    //! make sure done is called at the end: https://github.com/visionmedia/supertest/issues/520#issuecomment-456340621
    done();
  });
});

describe("POST request", () => {
  it("should return 400 if 'text' parameter is missing", async (done) => {
    const res = await request(server).post(API_ENDPOINT).send();

    expect(res.status).toEqual(400);
    done();
  });

  it("should return 400 if 'text' paramter is invalid", async (done) => {
    const invalidData = { text: " " };
    const res = await request(server).post(API_ENDPOINT).send(invalidData);

    expect(res.status).toEqual(400);
    done();
  });

  it("should return 201 and the inserted data", async (done) => {
    const validData = { text: "hello!" };
    const res = await request(server).post(API_ENDPOINT).send(validData);

    expect(res.status).toEqual(201);
    expect(res.body.text).toEqual(validData.text);
    done();
  });
});

describe("PUT request", () => {
  //* NOTE: this objectId is invalid on purpose
  const invalidObjectId = "123";

  it("should return 400 if 'text' parameter is missing", async (done) => {
    const res = await request(server)
      .put(`${API_ENDPOINT}/${invalidObjectId}`)
      .send();

    expect(res.status).toEqual(400);
    done();
  });

  it("should return 400 if 'text' parameter is invalid", async (done) => {
    const invalidData = { text: " " };
    const res = await request(server)
      .put(`${API_ENDPOINT}/${invalidObjectId}`)
      .send(invalidData);

    expect(res.status).toEqual(400);
    done();
  });

  it("should return 404 if document is not found", async (done) => {
    const validData = { text: "hello" };
    const res = await request(server)
      .put(`${API_ENDPOINT}/${invalidObjectId}`)
      .send(validData);

    expect(res.status).toEqual(404);
    done();
  });
});

describe("DELETE request", () => {
  //* NOTE: this objectId is invalid on purpose
  const invalidObjectId = "123";

  it("should return 404 if document is not found", async (done) => {
    const res = await request(server)
      .delete(`${API_ENDPOINT}/${invalidObjectId}`)
      .send();

    expect(res.status).toEqual(404);
    done();
  });
});
