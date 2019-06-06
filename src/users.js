"use strict"

const fs = require('fs'),

getUser = (uName, uPW) =>{
	let users, userFound

	try{
		users = require('../data/users.json')
		//users => JSON.parse(fs.readFileSync('./data/users.json'))
	} catch(error){
		console.log("El archivo users.json necesita crearse")
	}

	userFound = users.find(u => u.username == uName && u.password == uPW )
	
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
}



module.exports = { getUser }