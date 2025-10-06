import wdioLogger from '@wdio/logger';
import chalk from 'chalk';
import ConfigManager from './configManager.js';

const log = wdioLogger('wdio.core.runner');

const generatedManager = new ConfigManager();
const finalConfig = generatedManager.mainConfig;

log.info(`${chalk.green('🧩 WDIO Config Generated:')}
${JSON.stringify(finalConfig.capabilities, null, 2)}
`);

export const config = finalConfig;
