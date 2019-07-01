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
		this.state.templateData.push(this.getDefaultTemplate());
		this.state.formData.push(this.getDefaultForm());
	//	console.log(this.state.formData[0]);
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
				options : this.state.templateData[args.master].parts[args.diameter].category[args.part].option,
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
	
	
	}

	handleRemove(idx){
	
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
				<div className="form">
					<Form form={this.state.formData[0]} />
				</div>
					
				<button
						type="button"
						onClick={this.add}
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
						onClick={this.add}
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
