
var data = require('./parts.json')
data = data.parts;

function complexList(){

	{data.map(item => (
		console.log(item.diameter)
		{item.category.map(part => (
			console.log(part.name)
		))}
	))}
}

complexList();
