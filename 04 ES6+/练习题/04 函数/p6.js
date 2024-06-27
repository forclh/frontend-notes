// 根据下面的调用示例，编写User类
class User {
  constructor(account, passward) {
    this.account = account;
    this.passward = passward;
  }

  sayHello() {
    console.log(`账号 —— ${this.account}，密码 ——  ${this.passward}`)
  }
}


const u = new User('account', 'pwd123'); // 创建用户
u.sayHello(); // 输出：账号 —— account，密码 —— pwd123
