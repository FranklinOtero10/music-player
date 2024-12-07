const title = document.querySelector('.music-player h1');
const artist = document.querySelector('.music-player p');

const progress = document.getElementById('progress');
const songName = document.getElementById('song');

const iconControl = document.getElementById('icon-control')
const playPauseButton = document.querySelector('.controls button.play-pause');

const backButton = document.querySelector('.controls button.back');
const nextButton = document.querySelector('.controls button.next');

const songList = [
    {
        title: 'Eye in the sky',
        name: 'The Alan Parson Project',
        source: 'music/The Alan Parsons Project - Eye in the Sky (Official Audio).mp3'
    },
    {
        title: 'Sailing',
        name: 'Christopher Cross',
        source: 'music/Christopher Cross - Sailing.mp3'
    },
]

let indexSong = 0;

function updateInfoSong() {
    title.textContent = songList[indexSong].title;    
    artist.textContent = songList[indexSong].name;
    songName.src = songList[indexSong].source;
    songName.addEventListener('loadeddata', function(){});
};

songName.addEventListener('loadedmetadata', function(){
    progress.max = songName.duration;
    progress.value = songName.currentTime;
});

playPauseButton.addEventListener('click', playPause);

function playPause(){
    if (songName.paused) {
        playSong();        
    } else {
        pauseSong();        
    }
}

function playSong(){
    songName.play();
    iconControl.classList.add('bi-pause-fill');
    iconControl.classList.remove('bi-play-fill');
}

function pauseSong(){
    songName.pause();
    iconControl.classList.remove('bi-pause-fill');
    iconControl.classList.add('bi-play-fill');
}

songName.addEventListener('timeupdate', function(){
    if (!songName.paused) {
        progress.value = songName.currentTime;
    }
});

progress.addEventListener('input', function(){
    songName.currentTime = progress.value;
});

/* progress.addEventListener('change', function(){
    playSong();
}); */

nextButton.addEventListener('click', ()=>{
    indexSong = (indexSong + 1) % songList.length;
    updateInfoSong();
    playSong();
});

backButton.addEventListener('click', ()=>{
    indexSong = (indexSong - 1 + songList.length) % songList.length;
    updateInfoSong();
    playSong();
    console.log(songList.length);
});

updateInfoSong();