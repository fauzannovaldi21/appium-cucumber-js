class AndroidConfig {
    constructor(env) {
        this['appium:autoGrantPermissions'] = this.isTrue(env.AUTO_ACCEPT);
        this['appium:recreateChromeDriverSessions'] = this.isTrue(env.RECREATE_CHROMEDRIVER_SESSION);
        this['appium:noReset'] = !this.isTrue(env.RESET);
        this['appium:unlockType'] = 'pin';
        this['appium:unlockKey'] = env.UNLOCK_KEY || '1111';
    }

    isTrue(param, defaultValue = 'true') {
        return (param != null ? param.toLowerCase() === 'true' : defaultValue.toLowerCase() === 'true');
    }
}

export default AndroidConfig;
