import baseConfig from './base.js';

const witchConfig = {
    width: 70,
    height: 70,
    getSpeed: () => 2*baseConfig.SPEED_MULTIPLIER,
    minTimeSpawn: 1000
}

export default witchConfig;