function AppViewModel() {
  var masnad = this;
  masnad.amount = ko.observable(1000);
  masnad.email = ko.observable(null);
  masnad.password = ko.observable(null);
  masnad.paymentPlan = ko.observableArray();
  masnad.firstMonth = ko.observable(0.00);
  masnad.paymentPlanCame = ko.observable(false);

  masnad.delayedValue = ko.pureComputed(masnad.amount)
  .extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 100 } });
  masnad.delayedValue.subscribe(function (val) {
          masnad.amount(val);
          masnad.information();
         });
  masnad.information = function() {
    var x = {"amount" : masnad.amount()};
      $.ajax({
          type: 'GET',
          url: 'http://locahost:3000/getpaymentplan',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          data: x
      })
      .done(function(result) {
        masnad.paymentPlan([]);
        $.each(result, function (index, item) {
                    masnad.paymentPlan.push(item);
                });
        console.log(masnad.paymentPlan());
        masnad.firstMonth(masnad.paymentPlan()[0].total_payment_with_fee);
        masnad.paymentPlanCame(true);
      })
      .fail(function(xhr, status, error) {
          console.log(error);
      })
      .always(function(data){
      });
  }

  masnad.totalAmount = ko.computed(function() {
            var sum = 0;
            $.each(masnad.paymentPlan(), function (index, plan) {
                 sum += parseFloat(plan.total_payment_with_fee);
            });
            return sum.toFixed(2);
        });
  masnad.getStarted = function() {
    var x = {
      "amount" : masnad.amount(),
      "email" : masnad.email(),
      "password" : masnad.password()
    };
      $.ajax({
          type: 'GET',
          url: 'http://locahost:3000/getstarted',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          data: x
      })
      .done(function(result) {
        console.log(result);
         return window.location.href = result;
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
