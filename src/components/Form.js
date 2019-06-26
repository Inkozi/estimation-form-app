import React from 'react';
import Dropdown from './Dropdown.js';

var data = require("./parts.json");


function getDiameters(){
	var diameters = [];
	data.parts.forEach(item => (
		diameters.push(item.diameter)
	));
	return diameters;
}

function getParts(){
	var parts = [];
	for(var item in data.parts) {
		for (var partName in item.category){
			if (!parts.includes(partName.name)){
					parts.push(partName.name);
			}
		}
	}
	return parts
}

//items TODO get rid of this
var items = [1,2,3,4,5,6];


const ColorLine = ({ color }) =>(
	<hr
		style={{
			color: color,
			BackgroundColor: color,
			height: 5
		}}
	/>

);

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {"diameter": 0, "name" : '', "options" : [], "price" : 1, "quantity": 0, "total" : 0, fruit: [
        {
          id: 0,
          title: 'Apple',
          selected: false,
          key: 'fruit'
        },
        {
          id: 1,
          title: 'Orange',

          selected: false,
          key: 'fruit'
        },
        {
          id: 2,
          title: 'Grape',
          selected: false,
          key: 'fruit'
        },
        {
          id: 3,
          title: 'Pomegranate',
          selected: false,
          key: 'fruit'
        },
        {
          id: 4,
          title: 'Strawberry',
          selected: false,
          key: 'fruit'
        }
      ]
		}
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

	resetThenSet = (id, key) => {
		let temp = JSON.parse(JSON.stringify(this.state[key]))
		temp.forEach(item => item.selected = false);
		temp[id].selected = true;
		this.setState({
			[key]: temp
		})
	}

	//renders the form that changes with the state
	render() {
		return (
			<div>
			<h1> Part Estimation Form </h1>
			<ColorLine color="black" />
				<form>

					<div className="wrapper">
					<label>Diameter:</label>					
						<Dropdown
							title="Select diameter"
							list = {this.state.fruit}
							resetThenSet={this.resetThenSet}
						/>
					</div>

					<div className="wrapper">
					<label>Part:</label>
						<Dropdown
							title="Select part"
							list = {this.state.fruit}
							resetThenSet={this.resetThenSet}
						/>
					</div>
		
					
					<div className="wrapper">
					<label>Lengths:</label>
							<Dropdown
								title="Select length"
								list = {this.state.fruit}
								resetThenSet={this.resetThenSet}
							/>
						</div>

					<div>
					<label>Price:  ${this.state.price}</label>
					</div>

					<br></br>
					<label>Total: ${this.state.total}</label>
				</form>
			</div>
		);
	}
}

export default Form

