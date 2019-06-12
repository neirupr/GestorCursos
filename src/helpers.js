"use strict"

const hbs = require('hbs')

hbs.registerHelper('isActive', (val1, val2)=>{
	return val1 == val2 ? ' active' : ''
})

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

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

hbs.registerHelper('listStudents', (id, studentList, subscriptionList)=>{
	let response = '',
		subscriptions = subscriptionList.filter(subscription => subscription.course === id),
		arrayFiltered = []
		
		subscriptions.forEach(sub => {
			let student = studentList.find(stu => stu.id === sub.student)

			if(student !== undefined)
				student.course = sub.course
				arrayFiltered.push(student)
		})

	if(arrayFiltered.length > 0){
		arrayFiltered.forEach(student =>{
			response = response + 
						`<div class="row mx-0 my-1">
							<div class="col-11 d-flex align-items-center border-top mb-1 pt-1">` 
							+ student.name + 
							`</div>
							<div class="col-1 text-right">
								<form class="d-inline" action="/students" method="post">
									<input name="method" type="text" value="delete" class="d-none"/>
									<input name="id" type="number" value=` + student.id + ` class="d-none"/>
									<input name="course" type="number" value=` + student.course + ` class="d-none"/>
									<button class="btn btn-danger" type="submit">
										<i class="material-icons">delete</i>
									</button>
								</form>
							</div>
						</div>`			
		})
	} else {
		response = `<div class="row mx-0 my-1">
							<div class="col-11 d-flex align-items-center border-top mb-1 pt-1">
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

hbs.registerHelper('myCourses', (id, courseList, subscriptionList)=>{
	let response = '',
		arrayFiltered = []
		
		subscriptionList.forEach(sub => {
			let findedCourse = courseList.find(course => course.id === sub.course)

			if(findedCourse !== undefined)
				arrayFiltered.push(findedCourse)
		})
console.log(arrayFiltered)
	if(arrayFiltered.length > 0){
		arrayFiltered.forEach(course =>{
			response = response + 
						`<div class="row mx-0 my-1">
							<div class="col-4 p-3 text-center">` 
							+ course.name + 
							`</div><div class="col-4 p-3 text-center">`
							+course.description+
							`</div><div class="col-2 p-3 text-center">`
							+course.price+
							`</div>
							<div class="col-2 text-center">
								<form class="d-inline" action="/courseList" method="post">
									<input name="method" type="text" value="delete" class="d-none"/>
									<input name="id" type="number" value=` + id + ` class="d-none"/>
									<input name="course" type="number" value=` + course.id + ` class="d-none"/>
									<button class="btn btn-danger" type="submit">
										<i class="material-icons">delete</i>
									</button>
								</form>
							</div>
						</div>`			
		})
	} else {
		response = `<div class="row mx-0 my-1">
							<div class="col-12 d-flex align-items-center mb-1">
								Aún no te has inscrito en ningún curso
							</div>
						</div>`				
	}

	return response
})