import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';




//items TODO get rid of this
var items = [1,2,3,4,5,6];



class FormEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {"diameter": 0, "name" : '', "options" : [], "price" : 1, "quantity": 0, "total" : 0};
	}

	//polls for state selection that other state values depend on.
	poll(){
		for (var i = 0; i < items.length; i++){
			if (this.state.diameter == i){
				var idx = this.props[i];
				var part = idx.category[i];
			}
		}
	}

	//renders the form that changes with the state
	render() {
		return (
			<form>
				<h1>"Hello, World!"</h1>
				<label>{this.state.diameter}</label>
				<label>{this.state.part}</label>
				<label>{this.state.options}</label>
				<label>{this.state.price}</label>
				<label>{this.state.quantity}</label>
				<label>{this.state.total}</label>
			</form>
		);
	}
}


ReactDOM.render(<FormEntry />, document.getElementById('root'));
