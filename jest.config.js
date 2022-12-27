// jest.config.js
module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    testRunner: 'jasmine2',
    setupFilesAfterEnv: ["jest-allure/dist/setup"],
    moduleNameMapper: {
        "^csv-stringify/sync":
            "<rootDir>/node_modules/csv-stringify/dist/cjs/sync.cjs"
    }
}