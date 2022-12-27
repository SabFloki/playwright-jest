const allure = require('allure-commandline')
//const moment = require('moment')

module.exports = {
    // Describe which browsers we want to run
    browsers: ['chromium', 'firefox', 'webkit'],
    launchOptions: {
        // If we want to run browsers in headless mode or not,
        headless: true,
        // If we want to have opened devtools from start
        devtools: false,
    },
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableMochaHooks: true,
        }]],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                10000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },

    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (passed) {
            browser.saveScreenshot('./screenshots/Fail_' + '.png')
        }
    }
}