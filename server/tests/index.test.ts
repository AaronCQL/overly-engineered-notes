import { DB_NAME } from "../src/services/dbService";

describe("process.env environment variables", () => {
  it("should be set to TEST environment", () => {
    expect(process.env.NODE_ENV).toBeDefined();
    expect(process.env.NODE_ENV).toBe("test");

    expect(process.env.MONGO_URL).toBeDefined();
    expect(process.env.MONGO_URL?.includes(DB_NAME)).toBe(true);
  });
});
