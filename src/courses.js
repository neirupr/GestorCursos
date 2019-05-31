"use strict"

const fs = require('fs')
let coursesList = []

const read = () =>{
	try{
		coursesList = require('../courses.json')
		//coursesList => JSON.parse(fs.readFileSync('courses.json'))
	} catch(error){
		console.log("El archivo courses.json necesita crearse")
	}
}

const save = () =>{
	let data = JSON.stringify(coursesList)
	fs.writeFile('courses.json', data, err=>{
		if(err) trow(err)
		console.log("El archivo courses.json se ha creado con éxito")
	})
}


const create = (ecourse) =>{
	read();

	let exists = coursesList.find(course => course.id === ecourse.id)

	if (!exists){
		coursesList.push(ecourse)
		save()
		return {message: 'Se ha creado el curso!', success: 'success'}
	} else {
		console.log('Ya existe el curso')
		return {message: 'El curso ya existe', success: 'fail'}
	}
}

module.exports = {create}