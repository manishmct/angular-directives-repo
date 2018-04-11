import React, {Component} from 'react';
import InputCurrencyFormat from './Format-Currency'

class App extends Component {

  constructor(){
    this.state = {currency : "0.00"};
    this.currencyUpdate = this.currencyUpdate.bind(this);
  }
  componentWillMount() {
    console.log('Component WILL MOUNT!');
  }
  currencyUpdate(currency){
    console.log(currency);
    this.setState({currency});
  }
  render() {
    return (
      <div className="app">
        <h1>React - Currency Format Input</h1>
        <h4>Entered price - {this.state.currency}</h4>
        <InputCurrencyFormat data={this.state.currency} onValueUpdate={this.currencyUpdate} decimal_separator="." thousands_separator="," fractionSize="2" />
        <small className="signature">by <b>Manikandan</b> from <b>TCS</b></small>
      </div>
    );
  }
}
export default App;