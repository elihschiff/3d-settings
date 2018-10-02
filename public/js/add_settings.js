var app = new Vue({
  el: '#app',
  data: {
    printerSettings: {}
  },
  methods: {
    uploadSettings: function () {
      $.post( "/add_settings.html", function( data ) {
        $( ".result" ).html( data );
        alert( "Load was performed." );
      });
    }
  }
})
