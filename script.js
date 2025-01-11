// Load the IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create an array of YouTube video IDs
var videoIDs = [
  'meGeGXVFsPw', 
  'Jy6jJGIIUos', 
  '7gMRMDWxTfo'
]; // Replace with actual video IDs
var currentVideoIndex = 0;
var player;

// Function to load the IFrame Player API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoIDs[currentVideoIndex],
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Function to handle player ready state
function onPlayerReady(event) {
    event.target.playVideo();
}

// Function to handle player state change
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        currentVideoIndex++;
        if (currentVideoIndex < videoIDs.length) {
            player.loadVideoById(videoIDs[currentVideoIndex]);
        }
    }
}
