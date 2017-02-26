function AppViewModel() {
  var self = this;
  self.amount = ko.observable(1000);
  self.email = ko.observable(null);
  self.password = ko.observable(null);
  self.paymentPlan = ko.observableArray();
  self.firstMonth = ko.observable(0.00);
  self.paymentPlanCame = ko.observable(false);

  self.information = function() {
    var x = {"amount" : self.amount()};
      $.ajax({
          type: 'GET',
          url: 'http://localhost:3000/getIOT',
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
        self.paymentPlanCame(true);
      })
      .fail(function(xhr, status, error) {
          console.log(error);
      })
      .always(function(data){
      });
  }

  self.totalAmount = ko.computed(function() {
            var sum = 0;
            $.each(self.paymentPlan(), function (index, plan) {
                 sum += parseFloat(plan.total_payment_with_fee);
            });
            return sum.toFixed(2);
        });
}
    $(document).ready(function () {
        $.ajaxSetup({ cache: false });
        ko.applyBindings(new AppViewModel(), document.getElementById('KnockoutBind'));
    });
