// 导出一个函数，会自动获取文本框的值完成登录
import * as doms from './doms.js'
import { login } from './api/user.js'

let isLoginNow = false; //当前是否正在登录中

export default async function () {
  if (isLoginNow) {
    return; // 正在登录中
  }
  isLoginNow = true;
  doms.btnSubmit.value = '登录中...'
  // 1.获取当前的账号密码
  const loginId = doms.userName.value;
  const loginPwd = doms.userPassword.value;
  // 2.做一些简单的验证
  if (!loginId) {
    alert('请填写账号');
    return
  }
  if (!loginPwd) {
    alert('请填写密码');
    return
  }
  // 3.远程请求
  const response = await login(loginId, loginPwd);
  if (response) {
    alert(`登录成功，欢迎你，${response.nickname}`);
  } else {
    alert('登录失败！');
  }
  isLoginNow = false;
  doms.btnSubmit.value = '登录'
}
