import React, { Component } from 'react';

class InputCurrencyFormat extends Component {
  constructor() {
    this.state = {
      value: "",
      init: "",
      DECIMAL_SEPARATOR: "",
      THOUSANDS_SEPARATOR: ",",
      FRACTION_SIZE: "2",
      PADDING: "0000000"
    };
    this.handleKeyDownEvent = this.handleKeyDownEvent.bind(this);
  }
  componentWillMount() {
    console.log('Component WILL MOUNT!');
    console.log(this.props);
    this.setState({ DECIMAL_SEPARATOR: this.props.decimal_separator || "." });
    this.setState({ THOUSANDS_SEPARATOR: this.props.thousands_separator || "," });
    this.setState({ FRACTION_SIZE: this.props.fractionSize || 2 });
    if (this.props.data) {
      this.setState({ value: this.props.data.split(this.props.decimal_separator).join("") });
      this.setState({ init: this.props.data });
    }
    else
      this.setState({ init: "0" + this.props.decimal_separator + this.state.PADDING.substring(0, this.props.fractionSize) })
  }
  shouldComponentUpdate() {
    return true;
  }
  handleKeyDownEvent(event) {
    console.log(event.key);
    event.preventDefault();
    let value = this.state.value;
    let parsedValue = "";
    let divisor = parseInt("1" + this.state.PADDING.substring(0, this.state.FRACTION_SIZE), 10);
    if (event['key'].match(/[0-9]/g) && value.length < 16) {
      value += event['key'];
      parsedValue = this.parse(parseInt(value) / divisor);
      this.setState({ init: parsedValue });
      this.setState({ value });
      // console.log(parsedValue);
    }
    else if (event['keyCode'] === 8) {
      value = value.slice(0, -1);
      parsedValue = value ? this.parse(parseInt(value) / divisor) : "0" + this.state.DECIMAL_SEPARATOR + this.state.PADDING.substring(0, this.state.FRACTION_SIZE);
      // console.log(parsedValue);
      this.setState({ init: parsedValue });
      this.setState({ value });
    }
  }
  parse(value) {
    // console.log(value);
    let [integer, fraction = ""] = (value || "").toString().split(".");

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.state.THOUSANDS_SEPARATOR) || "0";

    fraction = parseInt(fraction, 10) > 0 && this.state.FRACTION_SIZE > 0
      ? this.state.DECIMAL_SEPARATOR + (fraction + this.state.PADDING).substring(0, this.state.FRACTION_SIZE)
      : this.state.DECIMAL_SEPARATOR + this.state.PADDING.substring(0, this.state.FRACTION_SIZE);

    return integer + fraction;
  }
  render() {
    return (
      <input type="text" value={this.state.init} onKeyDown={this.handleKeyDownEvent} onBlur={() => this.props.onValueUpdate(this.state.init)} />
    );
  }
}
export default InputCurrencyFormat;