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

hbs.registerHelper('listStudents', (id, studentList)=>{
	let response = '',
		arrayFiltered = studentList.filter(student => student.course === id)

	if(arrayFiltered.length > 0){
		arrayFiltered.forEach(student =>{
			response = response + 
						`<div class="row mx-0 my-1">
							<div class="col-11 d-flex align-items-center" style="border-top: 1px solid #dee2e6; margin-bottom: 4px">` 
							+ student.name + 
							`</div>
							<div class="col-1" style="text-align: right">
								<form class="d-inline" action="/students" method="delete">
									<button class="btn btn-danger">
										<i class="material-icons">delete</i>
									</button>
								</form>
							</div>
						</div>`			
		})
	} else {
		response = `<div class="row mx-0 my-1">
							<div class="col-11 d-flex align-items-center" style="border-top: 1px solid #dee2e6; margin-bottom: 4px">
								Ningún estudiante se encuentra inscrito en este curso
							</div>
							<div class="col-1">
								<button class="btn btn-danger invisible">
									<i class="material-icons">delete</i>
								</button>
							</div>
						</div>`				
	}

	return response
})