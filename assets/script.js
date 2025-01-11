// append youtube iFrame API from https://www.youtube.com/iframe_api
// docs: https://developers.google.com/youtube/iframe_api_reference#Getting_Started
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create an array of YouTube video IDs
var videoIDs = [
  'meGeGXVFsPw', 
  'Jy6jJGIIUos', 
  '7gMRMDWxTfo',
  'vFVR_s2if7E',
  '_CIFxSze_0w',
  'ZaeYEX3qgRY',
  'qqyzitqYvXA',
  '3DOkxQ3HDXE',
  'Gb2D-fQiHLI',
  'tKVzm0SBYtQ',
  'HHly9wFXYd8',
  'kNYaN7fVAKo',
  'WaXhd_U4rp0',
  'JFlHw2raQZM',
  'shBbIhxh0iM'
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
      const _ = this;
      console.log("initYoutube");
      this.player = new YT.Player("player", {
        width: 600,
        height: 400,
        videoId: videoIDs[currentVideoIndex],
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
          if (currentVideoIndex < videoIDs.length) {
              player.loadVideoById(videoIDs[currentVideoIndex]);
          }
      }
    } } });

onYouTubeIframeAPIReady = () => {
  console.log("onYouTubeIframeAPIReady");
  vueApp.initYoutube();
};