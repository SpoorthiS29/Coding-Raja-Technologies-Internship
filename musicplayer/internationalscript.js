function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

let now_playing = document.querySelector('.now_playing');
let track_art = document.querySelector('.track_art');
let track_name = document.querySelector('.track_name');
let track_artist = document.querySelector('.track_artist');

let playpause_btn = document.querySelector('.playpause_track');
let next_btn = document.querySelector('.next_track');
let prev_btn = document.querySelector('.prev_track');

let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current_time');
let total_duration = document.querySelector('.total_duration');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let updateTimer;

const music_list = [
    {
      name: 'Blackpink-Stay',
      music:'assets/music/blackpink-stay.mp3',
      artist:'Blackpink',
      cover:'assets/images/stay.jpg',
    },
    {
      name: 'Blackpink-Tally',
      music:'assets/music/blackpink-tally.mp3',
      artist:'Blackpink',
      cover:'assets/images/tally.jpg',
    },
    {
      name: 'BTS-That That',
      music:'assets/music/bts-that-that.mp3',
      artist:'Suga, PSY',
      cover:'assets/images/thatthat.jpg',
    },
    {
      name: 'BTS-Wild flower',
      music:'assets/music/bts-wild-flower.mp3',
      artist:'RM',
      cover:'assets/images/wildflower.jpg',
    },
    {
      name: 'Shinonoga E-Wa',
      music:'assets/music/fujii-kaze-shinunoga-e-wa.mp3',
      artist:'Fuji-Kaze',
      cover:'assets/images/fujikaze.jpg',
    },
  ];
  
loadTrack(track_index);
function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].cover + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;
    playTrack();
    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    
    
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>'
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>'
}

function nextTrack(){
  if(track_index < music_list.length - 1){
    track_index += 1;
  }
  else{
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack(){
  if(track_index > 0){
    track_index -= 1;
  }else{
    track_index = music_list.length -1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo(){
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setUpdate(){
  let seekPosition = 0;
  if(!isNaN(curr_track.duration)){
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if(currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if(durationSeconds < 10){
      durationSeconds = "0" + durationSeconds;
    }
    if(currentMinutes < 10){
      currentMinutes = "0" + currentMinutes;
    }
    if(durationMinutes < 10){
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}