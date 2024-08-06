// 入口文件，编写事件
import login from "./login.js";
import { formContainer } from './doms.js';

formContainer.addEventListener('submit', (e) => {
  e.preventDefault(); // 组织刷新的默认行为
  login();
});

