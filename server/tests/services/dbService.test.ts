import {
  DB_NAME,
  URI,
  initDb,
  closeDb,
  getDb,
} from "../../src/services/dbService";
import MongoClient from "mongodb";

describe("Database constants", () => {
  it("should be initialised to TEST environment", () => {
    expect(DB_NAME).toBe("cs3219-otot-b-TEST");
    expect(URI).toBe(process.env.MONGO_URL);
  });
});

describe("Initialise database", () => {
  afterAll(async (done) => {
    await closeDb();
    done();
  });

  it("should not throw error", async () => {
    await expect(initDb()).resolves.toBeUndefined();
  });

  it("should allow initialising with warning even if database is already initialised", async () => {
    console.warn = jest.fn();
    await expect(initDb()).resolves.toBeUndefined();
    await expect(initDb()).resolves.toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });
});

describe("Close database", () => {
  it("should not throw error", async () => {
    await expect(closeDb()).resolves.toBeUndefined();
  });

  it("should allow closing with warning even if database is not initialised", async () => {
    console.warn = jest.fn();
    await expect(closeDb()).resolves.toBeUndefined();
    await expect(closeDb()).resolves.toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });
});

describe("Get database", () => {
  beforeAll(async (done) => {
    await initDb();
    done();
  });

  afterAll(async (done) => {
    await closeDb();
    done();
  });

  it("should return the database instance if initialised", async () => {
    const db = getDb();

    expect(db).toBeInstanceOf(MongoClient.Db);
  });

  it("should return the same database instance if initialised", async () => {
    const db1 = getDb();
    const db2 = getDb();

    expect(db1).toBe(db2);
  });

  it("should throw error if database is not yet initialised", async () => {
    await closeDb();

    expect(getDb).toThrowError();
  });
});
