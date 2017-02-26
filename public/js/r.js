var Heading = React.createClass({
  getInitialState: function() {
      return {
        data : [],
         amount : 1000,
         firstMonth : 0,
         showtable : false,
         totalA : 0
      };
  },
  handleChange: function(event){
    this.setState({amount : event.target.value});
  },
    loadCommentsFromServer: function() {
      var amount = this.state.amount;
      var value = {
        method : 'GET' ,
        headers : {
          'Accept': 'application/json',
          'contentType' : 'application/x-www-form-urlencoded',
        },
      };
        fetch(`http://localhost:3000/getIOT?amount=${amount}`, value)
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
           this.setState({totalA : totalAmount})
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
                <input type="text" className="form-control" placeholder="Amount" value={amount} onChange={this.handleChange} />
              </div>
              <p>APR : </p>
              <p>Nominal: </p>
              <p>FirstMonth : {firstMonth} </p>
              <p>Total : {totalA}</p>
                <div className="form-group">
                  <label >Email address</label>
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-success" onClick={this.loadCommentsFromServer} >Submit</button>
                <hr />
                { this.state.showtable ? <TableView data={this.state.data} state={this.state.showtable}/> : null }
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
    <Heading
    name="React JS"
    >
    </Heading>
    </div>
, document.getElementById('reactBinding'));
