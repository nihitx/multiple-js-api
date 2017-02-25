function AppViewModel() {
  var self = this;
  self.amount = ko.observable(null);
  self.email = ko.observable(null);
  self.password = ko.observable(null);

  self.getJSON = () => {
      $.ajax({
          type: 'GET',
          url: 'https://iot-backend-metropolia.herokuapp.com/api/user',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
      })
      .done(function(result) {
          console.log(result);
      })
      .fail(function(xhr, status, error) {
          alert(error);
      })
      .always(function(data){
      });
  }
}

    $(document).ready(function () {
        /* Disable caching that is an ajax problem (ofcourse) with different versions of IE browser. */
        $.ajaxSetup({ cache: false });
        ko.applyBindings(new AppViewModel(), document.getElementById('KnockoutBind'));
    });
