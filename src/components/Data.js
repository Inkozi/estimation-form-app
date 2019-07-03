import React from 'react';
import Form from './Form';
import '../styles/form.css';
var data = require("./parts.json")




const ColorLine = ({ color }) =>(
	<hr
		style={{
			color: color,
			BackgroundColor: color,
			height: 1
		}}
	/>
);

class Data extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			template : data,
			templateData : [],
			formData : [],
			total : 0
		}
		this.timer = null;
		this.state.templateData.push(this.getDefaultTemplate());
		this.state.formData.push(this.getDefaultForm());
		this.handleAdd = this.handleAdd.bind(this);
		this.handleRemove = this.handleRemove.bind(this);

	}


	poll(){
		let totalSum = 0;
		for (var form = 0; form < this.state.formData.length; form++){
			totalSum += parseFloat(this.state.formData[form].total);
			if (totalSum != this.state.total){
				this.state.total = parseFloat(totalSum);
			}
			this.setState({}); //hack to update render
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
	 *	fxn : createEntry
	 *		creates a deep copy of data for a new entry in the form
	 *
	 */
	createEntry(){
		this.state.templateData.push(this.getDefaultTemplate()); //copy new master tmeplate
		this.state.formData.push(this.getDefaultForm()); //copy new model
	}

	/*
	 *
	 *	fxn : getTemplate
	 *		creates a copy of the master template (data)
	 *
	 */
	getDefaultTemplate(){
		return JSON.parse(JSON.stringify(this.state.template));
	}

	/*
	 *
	 *	fxn : getArray
	 *		args : {obj} { foo : idx }
	 */
	getDefaultForm(){
		let currIdx = this.state.templateData.length - 1;
		let args = {"master" : currIdx, "diameter" : 0, "part" : 0};
		let form = {
				master : this.state.templateData[args.master],
				diameters : this.state.templateData[args.master].parts,
				parts : this.state.templateData[args.master].parts[args.diameter].category,
				options : this.state.templateData[args.master].parts[args.diameter].category[args.part].options,
				quantity : 0,
				total : 0
		}
		return form;
	}

	getElement(arr){
		let element = arr.title;
		let idx = arr.id;
		let found = false;
		for (var item in arr){
			if (item.selected){
				element = item.title;
				idx = item.id;
				found = true;
			}
		}
		return {"element" : element, "idx" : idx, "found" : found};
	}

	handleSubmit(evt){
	
	
	}

	handleAdd(){
		this.state.templateData.push(this.getDefaultTemplate());
		this.state.formData.push(this.getDefaultForm());
	}

	handleRemove(idx){
		if (this.state.formData.length > 1){
			this.state.formData = this.state.formData.filter((s, sidx) => idx !== sidx);
		}
	}

	handleSubmit(){

	}

	/*
	 *
	 * 	fxn :: render()
	 * 		renders 
	 *
	 */
	render(){
		return(

			<div>
				<h1><u>Estimate </u></h1>

			<div className="data-wrapper">
			{this.state.formData.map((form, idx) => (
				<div>
					<div className="form">
						<Form form={this.state.formData[idx]} />
					</div>

					<div>
						<button
							type="button"
							onClick={() => {this.handleRemove(idx) }}
							className="smallRemove">
							Remove Item
						</button>
					</div>
				</div>

			))}
					
				<button
						type="button"
						onClick={this.handleAdd}
						className="smallAdd">
						Add Item
				</button>

				<div className="results">
					
					<div className="hrResults">
						<ColorLine color="black" />
					</div>

					<div className="total">
						<p>Total: ${this.state.total}</p>
					</div>
				
					<button
						type="button"
						onClick={this.handleSubmit}
						className="smallSubmit">
						Submit Item(s)
					</button>
					
					</div>
			</div>
		</div>

		);
	}
}

export default Data
