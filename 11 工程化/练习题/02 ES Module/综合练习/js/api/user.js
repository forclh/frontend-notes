// 负责和用户相关的远程请求
// 具名导出一个登录方法
export async function login(loginId, loginPwd) {
  const response = await fetch("https://study.duyiedu.com/api/user/login", {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ loginId, loginPwd }),
  })
  const result = await response.json();
  return result.data
}