"use strict"

const fs = require('fs'),

save = (userList) =>{
	let data = JSON.stringify(userList)
	fs.writeFile('./data/users.json', data, err=>{
		if(err) trow(err)
		console.log("El archivo users.json se ha creado con éxito")
	})
},

getUser = (uName, uPW) =>{
	let users, userFound

	try{
		users = require('../data/users.json')
		//users => JSON.parse(fs.readFileSync('./data/users.json'))
	} catch(error){
		console.log("El archivo users.json necesita crearse")
	}

	userFound = users.find(u => u.email === uName && u.password === uPW )
	
	if(userFound === undefined){
		return {
			message: 'Inicio de sesión incorrecto, verifica tus credenciales',
			success: 'fail'
		}
	} else {
		return {
			user: userFound,
			success: 'success'
		}
	}
},

createUser = eUser =>{
	let users, userFound

	try{
		users = require('../data/users.json')
		//users => JSON.parse(fs.readFileSync('./data/users.json'))
	} catch(error){
		console.log("El archivo users.json necesita crearse")
	}

	userFound = users.find(u => u.id === eUser.id)
	
	if(userFound !== undefined){
		return {message: 'El usuario ' + eUser.name + ' ya está registrado', success: 'fail'}
	} else {
		users.push(eUser)
		save(users)
		return {message: 'El usuario ' + eUser.name + ' se ha registrado correctamente!', success: 'success'}
	}
}



module.exports = { getUser, createUser }