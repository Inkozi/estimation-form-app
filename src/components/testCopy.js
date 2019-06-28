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
}

/*
 *
 *
 *
 */
const createEntry = () => { 
	let templateCopy = JSON.parse(JSON.stringify(this.template));
	this.templateData.push(templateCopy);
	let form = { 
			"master" : this.templateData[this.templateData.length - 1], 
			"diameters" : this.templateData[this.templateData.length - 1].parts, 
			"parts" : getDiameter(), 
			"lengths" : getLengths(), 
			"quantity" : 0, 
			"total": 0 
	};
	arr.length - 1
}


/*
 *
 *	fxn :: getDiameter
 *		@param = idx :: <int> ::  index in entry array
 *		@return  diameter :: <float> :: returns diameter in inches
 *		@returns diameterIdx :: <int> :: returns id or idx of the diameter in the array
 *
 */
const getDiameter = (idx) => {
	let diameter = 1;
	let diameterIdx = 0;
	for (diameter in arr[idx]){
		if (diameter.selected == true){
			diameter = diameter.title;
			diameterIdx = diameter.id;
		}
	}
	return diameter, diameterIdx;
};


/*
 *
 *	fxn :: getPart
 *		@param  idx :: <int> ::  index in diameter array
 *		@return part :: <string> :: returns a part name
 *		@return partIdx :: <int> :: returns the id or idx of the part in the array
 *
 *
 */
const getPart = (idx) => {
	let part = "Tube";
	let partIdx = 0;
	let _, diameterIdx = getDiameter(idx);
	for (item in arr[idx].parts[diameterIdx]){
		if (item.selected == true){
			part = item.title;
			partIdx = item.id;
		}
	}
	return part, partIdx;
};

/*
 *
 *	fxn :: getLengths
 *		@param  idx : index in parts array
 *		@return length : returns a length option
 *		@return lengthIdx : returns the id or idx of the length option in the array
 *
 */
const getLengths = (idx) => {
	//get entry 		arr[idx]
	//get diameter 		arr[idx].parts[0]
	//get part 			arr[idx].parts[0].category
	//get lengths		arr[idx].parts[0].category[0].options[0]
	let length = arr[idx].parts[0].category[0].options[0]; //default
	let lengthIdx = 0;
	let _, diameterIdx = getDiameter(idx);
	let _, partIdx = getPart(idx);
	for (length in arr[idx].parts[diameterIdx].category[partIdx]){
		if (length.selected == true){
			length = length.title;
			lengthIdx = length.id;
		}
	}
	return length, lengthIdx;
};



var arr = [];

arr.push(x(data));
arr.push(x(data));

arr[0].quantity = 1;
arr[1].quantity = 2;

form = { 
	"master" : arr[0], 
	"diameter" : arr[0].parts, 
	"parts" : getDiameter(), 
	"lengths" : getLengths(), 
	"quantity" : 0, 
	"total": 0 
};









console.log(arr);
