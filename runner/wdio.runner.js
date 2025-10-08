import path from 'path';
import fs from 'fs';
import { Launcher } from '@wdio/cli';
import wdioLogger from '@wdio/logger';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
import AllureService from './services/allureService.js';

const log = wdioLogger('wdio.runner');

const envFile = `./config/.${process.env.npm_config_config || 'android'}.conf.info`;
dotenv.config({ path: envFile });

process.env.IS_RUNNER = 'true';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const RUN_ID = `run_${timestamp}`;
const RUN_DIR = path.resolve(`./logs/${RUN_ID}`);

process.env.RUN_ID = RUN_ID;
process.env.RUN_DIR = RUN_DIR;

fs.mkdirSync(path.join(RUN_DIR, 'allure-results'), { recursive: true });
fs.mkdirSync(path.join(RUN_DIR, 'allure-report'), { recursive: true });

const allureService = new AllureService();

async function main() {
    log.info(chalk.cyan(`📁 Loaded env from: ${envFile}`));
    log.info(chalk.yellow(`🚀 Platform: ${process.env.PLATFORM_NAME}`));
    log.info(chalk.cyan(`🗂️ Run dir: ${RUN_DIR}`));

    try {
        const wdio = new Launcher(path.resolve('./runner/wdio.core.runner.js'));
        const exitCode = await wdio.run();

        await allureService.generateReport();
        log.info(chalk.cyan(`🔗 Open report: file://${RUN_DIR}/allure-report/index.html`));

        process.exit(exitCode);
    } catch (error) {
        log.error(chalk.red('❌ WDIO Runner failed:'), error);
        process.exit(1);
    }
}

main();
