const obj = {
  a: 1,
  b: 2,
  c: 3,
};
// 遍历对象的所有属性名
// for ... in 用于对象
for (let key in obj) {
  console.log(key);
}
// for ... of 用于数组和类数组
for (const key of Object.keys(obj)) {
  console.log(key);
}
// forEach
Object.keys(obj).forEach(function (key) {
  console.log(key);
})
// 遍历对象的所有属性值
for (const key of Object.values(obj)) {
  console.log(key);
}
// 遍历对象的所有属性名和属性值
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
// 复制obj的所有属性到一个新的对象
const newOjb = { ...obj };
console.log(newOjb);
// 复制obj除a以外的所有属性到一个新的对象
const { a, ...newOjb2 } = obj;
console.log(newOjb2);
