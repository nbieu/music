// append youtube iFrame API from https://www.youtube.com/iframe_api
// docs: https://developers.google.com/youtube/iframe_api_reference#Getting_Started
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var currentVideoIndex = 0;

var vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: function () {
    return {
      player: null };

  },
  methods: {
    onNext() {
      currentVideoIndex++;
      if (currentVideoIndex >= videoIDs.length) {
        currentVideoIndex = 0
      }
      var x = getYouTubeVideoID(videoIDs[currentVideoIndex])
      this.player.loadVideoById(x);
    },
    initYoutube() {
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
          this.onNext()
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
