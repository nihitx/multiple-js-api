var Heading = React.createClass({
  getInitialState: function() {
      return {
        data : [],
         amount : 1000,
         firstMonth : 0,
         showtable : false,
         totalA : 0,
         email: null,
         password : null
      };
  },
  handleChange: function(event){
    // console.log(event);
    this.setState({
      amount : this.refs.amount.value,
      email : this.refs.email.value,
      password : this.refs.password.value
    });
  },
    loadCommentsFromServer: function() {
      this.setState({ amount : this.refs.amount.value});
      var amount = this.state.amount;
      var value = {
        method : 'GET' ,
        headers : {
          'Accept': 'application/json',
          'contentType' : 'application/x-www-form-urlencoded',
        },
      };
        fetch(`https://react-vs-knockout.herokuapp.com/getpaymentplan?amount=${amount}`, value)
        .then((response) => response.json())
        .then((responseData) =>{
          console.log(responseData);
           this.setState({
             data: responseData,
             firstMonth : responseData[1].total_payment_with_fee,
             showtable : true
           });
           var totalAmount = 0;
           Object.keys(this.state.data).map((key,i)=>{
             totalAmount = parseFloat(totalAmount) +  parseFloat(this.state.data[key].total_payment_with_fee);
           });
           this.setState({totalA : totalAmount.toFixed(2)})
        })
        .catch(function(err){
         console.log(err);
      });
    },
    getStartedWithAurora : function(){
      var amount = this.state.amount;
      var email = this.state.email;
      var password = this.state.password;
      var value = {
        method : 'GET' ,
        headers : {
          'Accept': 'application/json',
          'contentType' : 'application/x-www-form-urlencoded',
        },
      };
      fetch(`https://react-vs-knockout.herokuapp.com/getstarted?amount=${amount}&email=${email}&password=${password}`, value)
      .then((response) => response.json())
      .then((responseData) =>{
        console.log(responseData);
        return window.location.href = responseData;
      })
      .catch(function(err){
       console.log(err);
    });
    },
    showTable : function(){
      this.setState({showtable : !this.state.showtable});
    },
    render : function(){
      var amount = this.state.amount;
      var firstMonth = this.state.firstMonth;
      var totalA = this.state.totalA;
      return(
        <div className="container">
          <div className="row">
            <div className="col-xs-4 col-xs-offset-4">
                <h1 className="text-center" ><img src="https://donejs.com/static/img/react-logo.png" /></h1>
              <div className="form-group">
                <label>How much <span>{amount}</span> </label>
                <input type="text" className="form-control" placeholder="Amount" ref="amount"  onKeyUp={this.loadCommentsFromServer} />
              </div>
              <p>APR : </p>
              <p>FirstMonth : {firstMonth} </p>
              <p>Total : {totalA}</p>
              { this.state.showtable ? <TableView data={this.state.data} state={this.state.showtable}/> : null }
                <div className="form-group">
                  <label >Email address</label>
                  <input type="email" className="form-control" ref="email" placeholder="Email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" ref="password" placeholder="Password" onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-success" onClick={this.getStartedWithAurora} >Get started</button>
                <hr />
                <a type="submit" className="btn btn-success" href="/">Knockout</a>
                <a type="submit" className="btn btn-success" href="/react.html">React</a>
            </div>
          </div>
        </div>
      );
    }
});

var TableView = React.createClass({
    render: function() {
      Object.keys(this.props.data).map((key,i)=>{
        console.log(this.props.data[key]);
      });
      let data = this.props.data;
        return (
          <table className="table">
            <thead>
              <tr>
                <th>capital payment</th>
                <th>duedate</th>
                <th>interest payment</th>
                <th>total payment</th>
                <th>total payment_with fee</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((key) => {
                return (
                  <tr key={key}>
                    <td> {data[key].capital_payment} </td>
                    <td> {data[key].duedate} </td>
                    <td> {data[key].interest_payment} </td>
                    <td> {data[key].total_payment} </td>
                    <td> {data[key].total_payment_with_fee} </td>
                  </tr>
                  );
                })}
            </tbody>
          </table>
        );
      }
});


ReactDOM.render(
  <div>
    <Heading name="React JS" > </Heading>
  </div>
, document.getElementById('reactBinding'));
