var app = new Vue({
  el: '#app',
  data: {
    printerSettings: {"test":1},
    oldPrinterSettings: {"test":1},
    canEdit: false,
    oldSettings: null,
    childrenSettings: {},
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
      // $.ajax({
      //   type: "POST",
      //   url: "/add_settings.html",
      //   data: app.printerSettings
      // });
      $.post( "/add_settings", app.printerSettings, function(data){
        console.log(app.printerSettings);
        console.log(data);
        window.location.href = data;
      });
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
          //if viewing old settings make it so that one can click the edit button
          if(app.oldSettings.length){
            canEdit = true;
          }

          //Viewing old settings so get all children settings
          if(app.oldSettings){
            console.log("/get_children/" + app.oldSettings)
            $.get( "/get_children/" + app.oldSettings, function( data ) {
              console.log("Data" + data)
              if(data){
                console.log("Data" + data)
                app.childrenSettings = data;
              }
            });
          }
        }
      });
    }
  }
})




// Charts

window.onload = function() {

  $.post( "/get_elements/"+"printSpeed", function(data){
    console.log(data);
    const values = new Map();
    for(var i=0;i<data.length;i++){
      if(values.get(data[i])){
        values.set(data[i], values.get(data[i])+1)
      }else {
        values.set(data[i], 1)
      }
    }

    console.log(values)

    var jsonValues = [];
    for (var [key, value] of values) {
      if(key != null){
        var tempJson = {};
        tempJson.label = key;
        tempJson.y = value;
        // console.log(tempJson)
        jsonValues.push(tempJson);
      }
    }
    console.log(JSON.stringify(jsonValues))

    var chartData = {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false,
        title: {
            text: "Printer Speed"
        },
        data: [{
            type: "column"//,
            // dataPoints:
        }]
    }
    jsonValues.sort(function (a, b) {
        return a.label > b.label;
    });
    chartData.data[0].dataPoints = jsonValues

    var chart = new CanvasJS.Chart("chartContainer", chartData);
    chart.render();
  });
}
