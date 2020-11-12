module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 999999,
  testMatch: [
    "<rootDir>/src/?(*.)+(spec|test).(ts|js)",
    "<rootDir>/src/**/?(*.)+(spec|test).(ts|js)",
  ],
};
