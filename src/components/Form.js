import React from 'react';
import Dropdown from './Dropdown.js';
import NumberBox from './NumberBox.js';
import '../styles/form.css';

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
			this.state = { form : this.props.form };
	}


	/*
	 *
	 *	fxn : polls
	 *		state selection that other state values depend on
	 *
	 */
	poll(){
		for (var i = 0; i < 6; i++){
			if (this.state.diameter == i){
				var idx = this.props[i];
				var part = idx.category[i];
			}
		}
	}


	/*
	 *
	 *	fxn : toggleSelected
	 *		@param id
	 *		@param key
	 */
	toggleSelected = (id, key) => {
		let temp = JSON.parse(JSON.stringify(this.state[key]))
		temp[id].selected = !temp[id].selected
		this.setState({
			[key]: temp
		})
	}


	/*
	 *
	 *
	 *	fxn : resetThenSet
	 *		resets the set value
	 *
	 *
	 */
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
							<div className="dd-label">
								<p>Diameter:</p>
							</div>
							<Dropdown
								title="Select diameter"
								list = {this.state.form.diameters}
								resetThenSet={this.resetThenSet}
							/>
						</div>

						<div className="wrapper">
							<div className="dd-label">
								<p>Part:</p>
							</div>
							<Dropdown
								title="Select part"
								list = {this.state.form.parts}
								resetThenSet={this.resetThenSet}
							/>
						</div>
								
						<div className="wrapper">
							<div className="dd-label">
								<p>Length:</p>
							</div>
								<Dropdown
									title="Select length"
									list = {this.state.form.lengths}
									resetThenSet={this.resetThenSet}
								/>
						</div>

						<div className="wrapper">
							<div className="dd-label">
								<p> Quantity: </p>
							</div>
							<NumberBox />
						</div>

						<ColorLine color="black" />

						<div className="results">
							<p>Price:  ${this.state.price}</p>
						</div>
						
					</form>
			</div>
		);
	}
}

export default Form

