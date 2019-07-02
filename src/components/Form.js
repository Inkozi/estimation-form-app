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
			this.timer = null;
			this.state = { form : this.props.form };
	}


	/*
	 *
	 *	fxn : polls
	 *		state selection that other state values depend on
	 *
	 */
	poll(){
		if (this.updateParts()) {
			this.updateOptions();
		}
		this.updatePrice();
	}

	/*
	 *
	 *	fxn :: updateParts()
	 *		updates parts list depending on the diameter
	 *
	 */
	updateParts(){
		let found = false;
		for (var item = 0; item < this.state.form.diameters.length; item++){
			if (this.state.form.diameters[item].selected == true){
				this.state.form.parts = this.state.form.diameters[item].category;
				this.setState({}) //hack to re-render page;
				found = true;
			}
		}
		return found;
	}

	/*
	 *
	 *	fxn :: updateOptions()
	 *		updates options list depending on parts;
	 *
	 */
	updateOptions(){
		for (var item = 0; item < this.state.form.parts.length; item++){
			if (this.state.form.parts[item].selected == true){
				this.state.form.options = this.state.form.parts[item].options;
				this.setState({}) //hack to re-render page;
			}
		}
	}

	/*
	 *
	 *	fxn : updatePrice
	 *		updates price for the item
	 *
	 */
	updatePrice(){
		for (var item = 0; item < this.state.form.options.length; item++){
			if (this.state.form.options[item].selected == true){
				this.state.form.total = this.state.form.options[item].price;
			}
		}

	}

	/*
	 *
	 *	fxn :: componentDidMount
	 *		Invokes a timer to poll changes and updates dropboxes.
	 *
	 */
	componentDidMount() {
		this.timer = setInterval(() => this.poll(), 100);
	}

	/*
	 *
	 *	fxn :: componentWillUnmount
	 *		Clears timer;
	 *
	 */
	componentWillUnmount(){
		clearInterval(this.timer);
		this.timer = null;
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
		let temp = JSON.parse(JSON.stringify(this.state.form[key]))
		this.state.form[key].forEach(item => item.selected = false);
		this.state.form[key][id].selected = true;
		this.setState({
			[key]: temp
		})
		console.log(this.state.form);
	}

	//renders the form that changes with the state
	render() {
		return (
			<div>
					<h3> Item </h3>
				<ColorLine color="black" />
					<form onSubmit={e => {e.preventDefault(); }}>

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
							<NumberBox number={this.state.form.quantity} />
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

