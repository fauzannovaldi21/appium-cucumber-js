import path from 'path';
import WdioBaseConfig from './config/wdio.config.js';
import AndroidConfig from './config/android.config.js';
import { capabilities } from './capabilities.js';

class ConfigManager {
    constructor() {
        this.env = process.env;

        this.mainConfig = new WdioBaseConfig(this.env);

        if (this.env.PLATFORM_NAME?.toLowerCase() === 'android') {
            this.deviceConfig = new AndroidConfig(this.env);
        }

        this.constructFeaturePath();
        this.setCapabilities();
        this.mainConfig.cucumberOpts.require.push('./hooks/hooksIndex.js');
    }

    constructFeaturePath() {
        let featurePath = './features';
        if (this.env.FEATURE_DIR) featurePath += `/${this.env.FEATURE_DIR}`;
        if (this.env.FEATURE_FILE) {
            this.mainConfig.specs.push(
                path.join(process.cwd(), `${featurePath}/${this.env.FEATURE_FILE}.feature`),
            );
        } else {
            this.mainConfig.specs.push(path.join(process.cwd(), `${featurePath}/*.feature`));
        }
    }

    setCapabilities() {
        this.mainConfig.capabilities = capabilities(this.deviceConfig);
    }
}

export default ConfigManager;
