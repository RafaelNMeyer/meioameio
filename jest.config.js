import nextJest from "next/jest.js";

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  modulePathIgnorePatterns: ["__tests__/orchestrator.js"],
  modulePaths: ["<rootDir>"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
