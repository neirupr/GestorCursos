"use strict"

const hbs = require('hbs')

hbs.registerHelper('isActive', (val1, val2)=>{
	return val1 == val2 ? ' active' : ''
})

hbs.registerHelper('displayMessage', (status, message)=>{
	let response
	if(status == 'success'){
		response = `<div class="alert alert-success alert-dismissible fade show" role="alert">`
					+ message + 
					`<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    					<span aria-hidden="true">&times;</span>
  					</button></div>`
	} else if(status == 'fail'){
		response = `<div class="alert alert-danger alert-dismissible fade show" role="alert">` 
					+ message + 
					`<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button></div>`
	} else {
		response = ''
	}

	return response
})