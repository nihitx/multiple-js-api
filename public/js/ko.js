function AppViewModel() {
  var self = this;
  self.amount = ko.observable(null);
  self.email = ko.observable(null);
  self.password = ko.observable(null);
  self.paymentPlan = ko.observableArray();
  self.firstMonth = ko.observable();

  self.information = function() {
    var x = {"amount" : self.amount()};
      $.ajax({
          type: 'GET',
          url: 'https://gentle-oasis-93873.herokuapp.com/getIOT',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          data: x
      })
      .done(function(result) {
        self.paymentPlan([]);
        $.each(result, function (index, item) {
                    self.paymentPlan.push(item);
                });
        console.log(self.paymentPlan());
        self.firstMonth(self.paymentPlan()[0].total_payment_with_fee);
      })
      .fail(function(xhr, status, error) {
          console.log(error);
      })
      .always(function(data){
      });
  }


}

    $(document).ready(function () {
        $.ajaxSetup({ cache: false });
        ko.applyBindings(new AppViewModel(), document.getElementById('KnockoutBind'));
    });
