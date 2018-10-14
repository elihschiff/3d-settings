var app = new Vue({
  el: '#app',
  data: {
    shareUrl: {}
  },
  mounted:function(){
      //set the url link on page load
      this.getLink();
  },
  methods: {
    //generates the correct url share link using the id in the query parameters
    getLink: function(){
      let urlParams = new URLSearchParams(window.location.search);

      //check if on localhost, just needed for development
      if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        this.shareUrl = "http://localhost:3000/add_settings?id=" + urlParams.get('id');
      }else{
        this.shareUrl = "http://" + window.location.hostname + "/add_settings?id=" + urlParams.get('id');
      }
    }
  }
})
