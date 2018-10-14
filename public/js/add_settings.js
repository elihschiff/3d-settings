var app = new Vue({
  el: '#app',
  data: {
    printerSettings: {"test":1}
  },
  mounted:function(){
      //gets settings if there is an id in the query parameters
      this.getSettings();
  },
  methods: {
    uploadSettings: function () {
      // $.post( "/add_settings.html", function( data ) {
      // });
      console.log(JSON.stringify(this.printerSettings));
    },
    //changes the printerSettings to the settings from the database
    getSettings: function(){
      let urlParams = new URLSearchParams(window.location.search);
      $.get( "/get_settings/" + urlParams.get('id'), function( data ) {
        if(data){
          console.log(JSON.stringify(data[0]));
          app.printerSettings = data[0];
        }
      });
    }
  }
})
