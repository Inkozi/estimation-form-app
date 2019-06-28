import React from 'react';
import Form from './Form';
var data = require("./parts.json")


class Data extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			template : data,
			templateData : [],
			formData : []
		}
	}

	/*
	 *
	 *	fxn : createEntry
	 *		creates a deep copy of data for a new entry in the form
	 *
	 */
	createEntry(){
		this.templateData.push(this.getDefaultTemplate()); //copy new master tmeplate
		this.formData.push(this.getDefaultForm()); //copy new model
	}

	/*
	 *
	 *	fxn : getTemplate
	 *		creates a copy of the master template (data)
	 *
	 */
	getDefaultTemplate(){
		return JSON.parse(JSON.stringify(this.template));
	}

	/*
	 *
	 *	fxn : getArray
	 *		args : {obj} { foo : idx }
	 */
	getDefaultForm(){
		let currIdx = this.templateData.length - 1;
		let args = {"master" : currIdx, "diameter" : 0, "part" : 0};
		let form = {
				"master" : this.templateData[args.master],
				"diameters" : this.templateData[args.master].parts,
				"parts" : this.templateData[args.master].parts[args.diameter].category,
				"lengths" : this.templateData[args.master].parts[args.diameter].category[args.part].option,
				"quantity" : 0,
				"total" : 0
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

			<div className="data-wrapper">
				<div className="form">
					<Form />
				</div>

				<div className="total">
					<p>Total: ${this.state.total}</p>
				</div>

				<button
					type="button"
					onClick={this.handleRemove(1)}
					className="small">
					Remove Item
				</button>

				<button
					type="button"
					onClick={this.add}
					className="small">
					Add Item
				</button>
						
				<div className="total">
					<p>Total: ${this.state.total}</p>
				</div>
			</div>

		);
	}
}

export default Data
