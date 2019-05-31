"use strict"

const hbs = require('hbs')

hbs.registerHelper('isActive', (val1, val2)=>{
	return val1 == val2 ? ' active' : ''
})

hbs.registerHelper('displayMessage', (status, message)=>{
	let response
	if(status == 'success'){
		response = `<div class="alert alert-success" role="alert">` + message + `</div>`
	} else if(status == 'fail'){
		response = `<div class="alert alert-danger" role="alert">` + message + `</div>`
	} else {
		response = ''
	}

	return response
})