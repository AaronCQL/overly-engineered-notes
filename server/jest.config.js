module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // collect coverage only from src/ dir
  collectCoverageFrom: ["src/**/*.ts"],
  // ignore dist/ dir
  testPathIgnorePatterns: ["/dist/"],
};
