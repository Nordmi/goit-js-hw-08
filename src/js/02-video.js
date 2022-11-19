import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIME_KEY = 'videoplayer-current-time';

checkTime();

const onPlay = function (data) {
  localStorage.setItem(TIME_KEY, data.seconds);
  // console.log(localStorage.getItem(TIME_KEY));
};

function checkTime() {
  if (localStorage.getItem(TIME_KEY) === null) {
    return localStorage.setItem(TIME_KEY, 0);
  }
  player.setCurrentTime(localStorage.getItem(TIME_KEY));
}

player.on('timeupdate', throttle(onPlay, 1000));