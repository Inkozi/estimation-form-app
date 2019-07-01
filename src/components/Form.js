import React from 'react';
import Dropdown from './Dropdown.js';
import NumberBox from './NumberBox.js';
import '../styles/form.css';

const ColorLine = ({ color }) =>(
	<hr
		style={{
			color: color,
			BackgroundColor: color,
			height: 1,
			width: "100%"
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


	handleRemove(idx){
	
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
		console.log(key);
		let temp = JSON.parse(JSON.stringify(this.state.form[key]))
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
					<h3> Item </h3>
					<button
						type="button"
						onClick={this.handleRemove(1)}
						className="smallRemove">
						Remove Item
					</button>

				<ColorLine color="black" />
					<form>

						<div className="wrapper">
							<div className="dd-label">
								<p>Diameter:</p>
							</div>
							<Dropdown
								title="Select Diameter"
								list = {this.state.form.diameters}
								resetThenSet={this.resetThenSet}
							/>
						</div>

						<div className="wrapper">
							<div className="dd-label">
								<p>Part:</p>
							</div>
							<Dropdown
								title="Select Part"
								list = {this.state.form.parts}
								resetThenSet={this.resetThenSet}
							/>
						</div>
								
						<div className="wrapper">
							<div className="dd-label">
								<p>Option:</p>
							</div>
								<Dropdown
									title="Select Option"
									list = {this.state.form.options}
									resetThenSet={this.resetThenSet}
								/>
						</div>

						<div className="wrapper">
							<div className="dd-label">
								<p> Quantity: </p>
							</div>
							<NumberBox />
						</div>

						<div className="price">
							<p>Price:  ${this.state.form.total}</p>
						</div>
					
						<ColorLine color="black" />

						
					</form>
			</div>
		);
	}
}

export default Form

