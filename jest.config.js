const nextJest = require('next/jest')
 
/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
})

module.exports = createJestConfig()