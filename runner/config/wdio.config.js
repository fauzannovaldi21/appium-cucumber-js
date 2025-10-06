import fs from 'fs'
import chalk from 'chalk'
import AllureService from '../services/allureService.js'

const allureService = new AllureService()
console.log(chalk.cyan(`📁 Allure results folder: ${allureService.resultsDir}`))

class WdioBaseConfig {
  constructor(env) {
    this.maxInstances = 1
    this.logLevel = 'info'
    this.waitforTimeout = parseInt(env.WAIT_FOR_TIMEOUT, 10) || 30000
    this.connectionRetryTimeout = 120000
    this.connectionRetryCount = 2

    this.services = [
      [
        'appium',
        {
          args: {
            port: parseInt(env.PORT, 10) || 4723,
            allowInsecure: 'chromedriver_autodownload',
          },
        },
      ],
    ]

    this.framework = 'cucumber'
    this.reporters = [
      'spec',
      [
        'allure',
        {
          outputDir: allureService.resultsDir,
          disableWebdriverStepsReporting: true,
          disableWebdriverScreenshotsReporting: false,
          useCucumberStepReporter: true,
        },
      ],
    ]

    this.specs = []
    this.capabilities = []
    this.cucumberOpts = {
      require: ['./features/**/stepDefinitions/*.steps.js'],
      timeout: parseInt(env.CUCUMBER_TIMEOUT, 10) || 120000,
    }

    fs.mkdirSync(allureService.resultsDir, { recursive: true })
  }
}

export default WdioBaseConfig
