import $ from 'jquery';
import styles from './index.module.less';
import videoUrl from '../assets/movie.mp4';
import audioUrl from '../assets/music.mp3';
function init() {
  const container = $('<div>').addClass(styles.container).appendTo('#app');
  // 添加标题
  $('<h1>').text('豆瓣电影').addClass(styles.title).appendTo('#app')
  // 视频元素
  const video = $('<video>').prop('src', videoUrl).prop('autoplay', true).prop('loop', true).addClass(styles.video).appendTo(container);
  // 音频元素
  const audio = $('<audio>').prop('src', audioUrl).prop('autoplay', true).prop('loop', true).appendTo(container);
  // 监听滚动事件来进行音视频的暂停与播放
  $(window).on('scroll', function () {
    const scrollTop = document.documentElement.scrollTop;  // 滚动高度
    const vHeight = document.documentElement.clientHeight;  // 视口高度
    if (scrollTop >= vHeight) {
      video[0].pause();
      audio[0].pause();
    } else {
      video[0].play();
      audio[0].play();
    }
  })
};

init();