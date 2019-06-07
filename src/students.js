"use strict"

const fs = require('fs')
let studentsList = []

const read = () =>{
	try{
		studentsList = require('../data/students.json')
		//studentsList => JSON.parse(fs.readFileSync('./data/students.json'))
	} catch(error){
		console.log("El archivo students.json necesita crearse")
	}
}

const save = () =>{
	let data = JSON.stringify(studentsList)
	fs.writeFile('./data/students.json', data, err=>{
		if(err) trow(err)
		console.log("El archivo students.json se ha creado con éxito")
	})
}


const subscribe = (register) =>{
	read()

	let existsInCourse = studentsList.find(row => row.student === register.student && row.course === register.course)

	if (!existsInCourse){
		studentsList.push(register)
		save()
		return {message: 'El estudiante se ha registrado correctamente!', success: 'success'}
	} else {
		return {message: 'El estudiante ya está registrado en el curso ', success: 'fail'}
	}
}

const cancel = (student, course)=>{
	read()

	let subscription = studentsList.find(s => (s.id === student && s.course === course)),
		index = studentsList.indexOf(subscription)

	studentsList.splice(index, 1)
	save()

	return {message: 'El estudiante se ha retirado correctamente', success: 'success'}
}

const getStudents = () =>{
	read()
	return studentsList
}

module.exports = {subscribe, getStudents, cancel}