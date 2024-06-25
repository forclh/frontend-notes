// 1. 数据逻辑

/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象：{time:开始时间,words:歌词内容}
 */
function parseLrc() {
  const lines = lrc.split('\n');
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    parts = line.split(']');
    const timeStr = parts[0].substring(1);

    const obj = {
      time: parseTime(timeStr),
      words: parts[1]
    };

    result.push(obj);
  }
  return result;
}

/**
 * 将时间字符串转换为秒数
 */
function parseTime(timeStr) {
  const parts = timeStr.split(':');
  return +parts[0] * 60 + +parts[1];
}

const doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container')
}

const lrcData = parseLrc();


/**
 * 计算出在当前情况下
 * lrcData数组中应该高亮显示的歌词下标
 * 如果没有任何一句歌词需要显示则返回-1
 */
function findIndex() {
  // 当前播放器的时间
  let curTime = doms.audio.currentTime;
  // 根据当前时间在找对应的歌词
  for (let i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return i - 1;
    }
  }
  // 找遍了都没找到（说明播放到最后一句了）
  return lrcData.length - 1;
}

// 2. 界面逻辑

/**
 * 创建歌词对象
 */
function createLrcElement() {
  let frag = document.createDocumentFragment();  // 创建文档片段（与dom无关）
  for (let i = 0; i < lrcData.length; i++) {
    const li = document.createElement('li');
    li.textContent = lrcData[i].words;
    // doms.ul.appendChild(li);  // 频繁改变了dom树（假装有效率问题）
    frag.appendChild(li);
  }
  doms.ul.appendChild(frag);  // 通过文档片段只改变了一次dom树
}

createLrcElement();

// 容器的高度
const containerHeight = doms.container.clientHeight;
// li的高度
const liHeight = doms.ul.children[0].clientHeight;
// 最大偏移量
const maxOffset = doms.ul.clientHeight - containerHeight;

/**
 * 设置ul元素的偏移量
 */
function setOffset() {
  let index = findIndex();
  let h1 = index * liHeight + liHeight / 2;
  let h2 = containerHeight / 2;
  let offset = h1 - h2;
  // 边界值处理
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  doms.ul.style.transform = `translateY(-${offset}px)`;
  // 去除之前的样式
  let oldLi = doms.ul.querySelector('.active');
  if (oldLi) {
    oldLi.classList.remove('active');
  }

  // 添加高亮显示
  const newLi = doms.ul.children[index]
  if (newLi) {
    doms.ul.children[index].classList.add('active');
  }
}


// 3. 事件
// 监听播放时间的改变
doms.audio.addEventListener('timeupdate', setOffset)