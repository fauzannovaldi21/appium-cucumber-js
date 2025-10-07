import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import allure from '@wdio/allure-reporter';

class AllureService {
    constructor() {
        if (!process.env.RUN_DIR) {
            const fallback = path.resolve('./logs/run_default');
            console.warn(`⚠️ RUN_DIR belum di-set, fallback ke ${fallback}`);
            process.env.RUN_DIR = fallback;
        }

        this.runDir = path.resolve(process.env.RUN_DIR);
        this.resultsDir = path.join(this.runDir, 'allure-results');
        this.reportDir = path.join(this.runDir, 'allure-report');
        this.envFilePath = path.join(this.resultsDir, 'environment.properties');

        fs.mkdirSync(this.resultsDir, { recursive: true });
        console.log(`📁 Allure results folder: ${this.resultsDir}`);
    }

    attachMetadata() {
        const envProps = [
            `Platform=${process.env.PLATFORM_NAME || ''}`,
            `DeviceName=${process.env.DEVICE_NAME || ''}`,
            `App=${process.env.APP || ''}`,
            `Reset=${process.env.RESET || ''}`,
        ];
        fs.writeFileSync(this.envFilePath, envProps.join('\n'));
        console.log(`🧾 Allure metadata saved at ${this.envFilePath}`);
    }

    async startRecording() {
        const allow = String(process.env.RECORD_ALLURE).toLowerCase() === 'true';
        if (!allow || typeof driver === 'undefined' || !driver) return;
        try {
            await driver.startRecordingScreen();
            console.log('🎥 Screen recording started.');
        } catch (err) {
            console.warn(`⚠️ Failed to start recording: ${err.message}`);
        }
    }

    async stopRecording(world) {
        const allow = String(process.env.RECORD_ALLURE).toLowerCase() === 'true';
        if (!allow || typeof driver === 'undefined' || !driver) return;
        try {
            const videoBase64 = await driver.stopRecordingScreen();
            allure.addAttachment(
                `🎬 Scenario Recording: ${world?.pickle?.name || 'unknown'}`,
                Buffer.from(videoBase64, 'base64'),
                'video/mp4',
            );
            console.log('🎬 Screen recording stopped and attached.');
        } catch (err) {
            console.warn(`⚠️ Failed to stop recording: ${err.message}`);
        }
    }

    async attachScreenshot(step) {
        const shouldCapture = String(process.env.SCREENSHOT_ALLURE).toLowerCase() === 'true';
        if (!shouldCapture || typeof driver === 'undefined' || !driver) return;
        try {
            const image = await driver.takeScreenshot();
            allure.addAttachment(
                `📸 Step: ${step?.pickleStep?.text || 'unknown'}`,
                Buffer.from(image, 'base64'),
                'image/png',
            );
            console.log(`📸 Screenshot attached for step: ${step?.pickleStep?.text}`);
        } catch (err) {
            console.warn(`⚠️ Failed to capture screenshot: ${err.message}`);
        }
    }

    async generateReport() {
        console.log(`🧩 Generating Allure report for ${this.resultsDir}...`);
        if (!fs.existsSync(this.resultsDir)) {
            console.error(`❌ No allure-results found in ${this.resultsDir}`);
            return;
        }

        return new Promise((resolve, reject) => {
            exec(
                `npx allure generate ${this.resultsDir} --clean -o ${this.reportDir}`,
                (error, stdout) => {
                    if (error) {
                        console.error(`❌ Failed to generate Allure report: ${error.message}`);
                        reject(error);
                        return;
                    }
                    console.log(stdout);
                    console.log(`✅ Allure report generated at ${this.reportDir}`);
                    resolve();
                },
            );
        });
    }
}

export default AllureService;
