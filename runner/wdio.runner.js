import { Launcher } from '@wdio/cli';
import wdioLogger from '@wdio/logger';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
import path from 'path';
import allureService from './services/allure.instance.js';

const log = wdioLogger('wdio.runner');

const envFile = `./config/.${process.env.npm_config_config || 'android'}.conf.info`;
dotenv.config({ path: envFile });

async function main() {
  log.info(chalk.cyan(`📁 Loaded env from: ${envFile}`));
  log.info(chalk.yellow(`🚀 Platform: ${process.env.PLATFORM_NAME}`));

  try {
    const wdio = new Launcher(path.resolve('./runner/wdio.core.runner.js'));
    const exitCode = await wdio.run();

    log.info(chalk.green(`✅ Test run finished with code: ${exitCode}`));

    await allureService.generateReport();
    log.info(chalk.cyan(`🔗 Open report: file://${allureService.reportDir}/index.html`));

    process.exit(exitCode);
  } catch (error) {
    log.error(chalk.red('❌ WDIO Runner failed:'), error);
    process.exit(1);
  }
}

main();
