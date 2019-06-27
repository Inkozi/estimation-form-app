import React, { Component } from 'react'
import '../styles/number.css'

class NumberBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: ''
    }
  }
  
  handleChange(evt) {
	const number = 
		(evt.target.validity.valid) ?
		evt.target.value :
		this.state.number;
    this.setState({ number });
  }
  
  render() {
    return (
      <input type="text" pattern="[0-9]*" onInput={this.handleChange.bind(this)} value={this.state.number} />
    )
  }
}
 
export default NumberBox
