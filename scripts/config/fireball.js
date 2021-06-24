import baseConfig from './base.js';

const fireballConfig = {
    width: 30,
    height: 30,
    getSpeed: () => 5*baseConfig.SPEED_MULTIPLIER,
    timeLimit: 1000,
}

export default fireballConfig;