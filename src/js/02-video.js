import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const currentTimeKey = 'videoplayer-current-time';

player.on('timeupdate', throttle((event) => {
  const currentTime = Math.round(event.seconds);
  localStorage.setItem(currentTimeKey, currentTime);
}, 1000));

const currentTime = localStorage.getItem(currentTimeKey);
if (currentTime) {
  player.setCurrentTime(currentTime);
}
