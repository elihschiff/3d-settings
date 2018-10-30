var app = new Vue({
  el: '#app',
  data: {
    printerSettings: {"test":1},
    oldPrinterSettings: {"test":1},
    canEdit: false,
    oldSettings: null
  },
  mounted:function(){
      //gets settings if there is an id in the query parameters
      this.getSettings();
  },
  methods: {
    enableEditing: function () {
      console.log("now enable editing");
      app.canEdit = true;
    },
    uploadSettings: function () {
      // $.post( "/add_settings.html", function( data ) {
      // });
      // console.log(JSON.stringify(this.printerSettings));
    },
    //changes the printerSettings to the settings from the database
    getSettings: function(){
      let urlParams = new URLSearchParams(window.location.search);
      $.get( "/get_settings/" + urlParams.get('id'), function( data ) {
        if(data){
          console.log(JSON.stringify(data[0]));
          app.printerSettings = data[0];
          app.oldSettings = data[0]._id;
          delete app.printerSettings._id;
          delete app.printerSettings.__v;
          app.printerSettings.parentId = app.oldSettings;

          app.oldPrinterSettings = JSON.parse(JSON.stringify(app.printerSettings));
          if(app.oldSettings.length){
            canEdit = true;
          }
        }
      });
    }
  }
})
