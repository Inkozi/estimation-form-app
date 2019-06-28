import React from 'react';
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
		this.templateData.push(getDefaultTemplate()); //copy new master tmeplate
		this.formData.push(getDefaultForm()); //copy new model
	}

	/*
	 *
	 *	fxn : getTemplate
	 *		creates a copy of the master template (data)
	 *
	 */
	getTemplate(){
		return JSON.parse(JSON.stringify(this.template));
	}

	/*
	 *
	 *	fxn : getArray
	 *		args : {obj} { foo : idx }
	 */
	getForm(){
		let result = [];
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


	/*
	 *
	 *	fxn :: getDiameter
	 *		@param = idx :: <int> ::  index in entry array
	 *		@return  diameter :: <float> :: returns diameter in inches
	 *		@returns diameterIdx :: <int> :: returns id or idx of the diameter in the array
	 *
	 */
	getDiameter(idx){
		let diameter = 1;
		let diameterIdx = 0;
		for (diameter in arr[idx]){
			if (diameter.selected == true){
				diameter = diameter.title;
				diameterIdx = diameter.id;
			}
		}
		return {"value" : diameter, "idx" : diameterIdx};
	}


	/*
	 *
	 *	fxn :: getPart
	 *		@param  idx :: <int> ::  index in diameter array
	 *		@return part :: <string> :: returns a part name
	 *		@return partIdx :: <int> :: returns the id or idx of the part in the array
	 *
	 *
	 */
	getPart(idx){
		let part = "Tube";
		let partIdx = 0;
		let _, diameterIdx = getDiameter(idx);
		for (item in arr[idx].parts[diameterIdx]){
			if (item.selected == true){
				part = item.title;
				partIdx = item.id;
			}
		}
		return {"value" : part, "idx" : partIdx};
	}

	/*
	 *
	 *	fxn :: getLengths
	 *		@param  idx : index in parts array
	 *		@return length : returns a length option
	 *		@return lengthIdx : returns the id or idx of the length option in the array
	 *
	 */
	getLengths(idx){
		let length = this.formData[idx].lengths[0]; //default
		let lengthIdx = 0;
		let diameterIdx = getDiameter(idx).idx;
		let partIdx = getPart(idx).idx;
		for (length in arr[idx].parts[diameterIdx].category[partIdx]){
			if (length.selected == true){
				length = length.title;
				lengthIdx = length.id;
			}
		}
		return {"value" : length, "idx" : lengthIdx};
	}


	handleSubmit(evt){
		alert("TODO this later")
	}


	handleAdd(){
		this.form = {"diameter": 0, "name" : '', "options" : [], "price" : 1, "quantity": 0, "total" : 0}
		/*
		this.setState({
			forms: this.state.forms.concat([{ this.form }])
		});*/
	}

	handleRemove(idx){
		/*
		this.setState({
			forms: this.state.forms.filter((s, sidx) => idx !== sidx)
		});*/
	}


	/*
	 *
	 * 	fxn :: render()
	 * 		renders 
	 *
	 */
	render(){
		return( 

			<Form />
			
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
		);
	}
}

export default Data
