/**
 * 该函数返回一个Promise，他会等待指定的毫秒数，时间到达后该函数完成
 * @param {number} ms 毫秒数
 * @return {Promise}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// async function run() {
//   console.log(1);
//   await delay(1000);
//   console.log(2);
// }

// run();

module.exports = delay