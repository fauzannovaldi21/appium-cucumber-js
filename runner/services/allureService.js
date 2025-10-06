import allure from '@wdio/allure-reporter';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

class AllureService {
  constructor() {
    // Folder tetap, tidak pakai timestamp
    this.baseDir = path.resolve('./logs');
    this.resultsDir = path.join(this.baseDir, 'allure-results');
    this.reportDir = path.join(this.baseDir, 'allure-report');
    this.envFilePath = path.join(this.resultsDir, 'environment.properties');

    fs.mkdirSync(this.resultsDir, { recursive: true });
  }

  async attachScreenshot(step) {
    const shouldCapture = String(process.env.SCREENSHOT_ALLURE).toLowerCase() === 'true';
    if (!shouldCapture || typeof driver === 'undefined' || !driver) return;
    try {
      const image = await driver.takeScreenshot();
      allure.addAttachment(
        `📸 Step: ${step?.pickleStep?.text || 'unknown'}`,
        Buffer.from(image, 'base64'),
        'image/png'
      );
      console.log(`📸 Screenshot attached for step: ${step?.pickleStep?.text}`);
    } catch (err) {
      console.warn(`⚠️ Failed to capture screenshot: ${err.message}`);
    }
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
        'video/mp4'
      );
      console.log('🎬 Screen recording stopped and attached.');
    } catch (err) {
      console.warn(`⚠️ Failed to stop recording: ${err.message}`);
    }
  }

  attachMetadata() {
    try {
      const metadata = {
        Platform: process.env.PLATFORM_NAME || 'unknown',
        Environment: process.env.ENV || 'unknown',
        Device: process.env.DEVICE_NAME || 'unknown',
        App: process.env.APP || 'unknown',
        FreshInstall: process.env.FRESHINSTALL || 'false',
        RecordAllure: process.env.RECORD_ALLURE || 'false',
        ScreenshotAllure: process.env.SCREENSHOT_ALLURE || 'false',
      };

      const envData = Object.entries(metadata)
        .map(([k, v]) => `${k}=${v}`)
        .join('\n');

      fs.mkdirSync(this.resultsDir, { recursive: true });
      fs.writeFileSync(this.envFilePath, envData);

      for (const [k, v] of Object.entries(metadata)) {
        allure.addLabel(k.toLowerCase(), String(v));
      }

      console.log(`🧾 Allure metadata saved at ${this.envFilePath}`);
    } catch (err) {
      console.warn(`⚠️ Failed to attach metadata: ${err.message}`);
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
        }
      );
    });
  }
}

export default AllureService;
