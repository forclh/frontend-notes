const print = require('./print');
const delay = require('./delay');
const config = require('./config');
/**
 * 运行该函数，会逐字打印config.js中的文本
 * 每个字之间的间隔在config.js中已有配置
 */
async function run() {
  for (let i = 0; i < config.text.length; i++) {
    print(i);
    await delay(config.wordDuration)
  }
}

run();