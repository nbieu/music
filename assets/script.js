// append youtube iFrame API from https://www.youtube.com/iframe_api
// docs: https://developers.google.com/youtube/iframe_api_reference#Getting_Started
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create an array of YouTube video IDs
var videoIDs = [
  'https://youtu.be/meGeGXVFsPw', 
  'https://youtu.be/Jy6jJGIIUos', 
  'https://youtu.be/7gMRMDWxTfo',
  'https://youtu.be/vFVR_s2if7E',
  'https://youtu.be/_CIFxSze_0w',
  'https://youtu.be/ZaeYEX3qgRY',
  'https://youtu.be/qqyzitqYvXA',
  'https://youtu.be/3DOkxQ3HDXE',
  'https://youtu.be/Gb2D-fQiHLI',
  'https://youtu.be/tKVzm0SBYtQ',
  'https://youtu.be/HHly9wFXYd8',
  'https://youtu.be/kNYaN7fVAKo',
  'https://youtu.be/WaXhd_U4rp0',
  'https://youtu.be/2dpsU2XTI8k',
  'https://youtu.be/shBbIhxh0iM',
  'https://youtu.be/9BgNVW4T1eo',
  'https://youtu.be/aAhW9gUUJCA',
  'https://youtu.be/ulQoJ91jgYo',
  'https://youtu.be/riJGGRviuuU',
  'https://youtu.be/hO7jliJjM6s',
  'https://youtu.be/7ATeQTV79A4',
  'https://youtu.be/wrkCeXVdekM'
]; // Replace with actual video IDs
var currentVideoIndex = 0;
var player;

var vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: function () {
    return {
      player: null };

  },
  methods: {
    initYoutube() {
      videoIDs = shuffleArray(videoIDs)
      var x = getYouTubeVideoID(videoIDs[currentVideoIndex])
      const _ = this;
      console.log("initYoutube");
      this.player = new YT.Player("player", {
        width: 600,
        height: 400,
        videoId: x,
        events: {
          onReady: _.onPlayerReady,
          onStateChange: _.onPlayerStateChange } });


    },
    onPlayerReady(evt) {
      console.log("Player ready");
      evt.target.playVideo();
    },
    onPlayerStateChange(evt) {
      console.log("Player state changed", evt);
      if (evt.data == YT.PlayerState.ENDED) {
          currentVideoIndex++;
          if (currentVideoIndex >= videoIDs.length) {
            currentVideoIndex = 0
          }
          var x = getYouTubeVideoID(videoIDs[currentVideoIndex])
          this.player.loadVideoById(x);
      }
    } } });

onYouTubeIframeAPIReady = () => {
  console.log("onYouTubeIframeAPIReady");
  vueApp.initYoutube();
};

function getYouTubeVideoID(url) {
  const regex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/))([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      // Generate a random index
      const j = Math.floor(Math.random() * (i + 1));
      
      // Swap elements at index i and j
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}