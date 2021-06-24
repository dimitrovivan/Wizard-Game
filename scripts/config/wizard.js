import baseConfig from './base.js';

const wizardConfig = {
    health: 100,
    width: 60,
    height: 70,
    top: 300,
    left: 150,
    getSpeed: () => 2*baseConfig.SPEED_MULTIPLIER
}

export default wizardConfig;