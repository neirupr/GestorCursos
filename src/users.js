"use strict"

const fs = require('fs'),

fetchUsers = ()=>{
	let users
	try{
		users = require('../data/users.json')
	} catch(error){
		console.log("El archivo users.json necesita crearse")
	}
	return users;
},

save = (userList) =>{
	let data = JSON.stringify(userList)
	fs.writeFile('./data/users.json', data, err=>{
		if(err) trow(err)
		console.log("El archivo users.json se ha creado con éxito")
	})
},

findUser = (uName, uPW) =>{
	let users, userFound

	users = fetchUsers();

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
	users = fetchUsers();

	userFound = users.find(u => u.id === eUser.id)
	
	if(userFound !== undefined){
		return {message: 'El usuario ' + eUser.name + ' ya está registrado', success: 'fail'}
	} else {
		users.push(eUser)
		save(users)
		return {message: 'El usuario ' + eUser.name + ' se ha registrado correctamente! <a href="/login">Puedes ingresar a la página de login</a>', success: 'success'}
	}
},

getUsers = ()=>{
	return  fetchUsers();
},


findByid = (stId) =>{
	let users, userFound
	users = fetchUsers();
	userFound = users.find(u => u.id === parseInt(stId))
	return userFound
},

updateUser = (user) =>{

	let users = fetchUsers();
	let found = users.findIndex(u => u.id == user.id);
    if(!found){
        console.log('Estudiante no existe');
    }else{
		users[found]= user
		save(users)
    }
}

module.exports = { findUser, createUser, getUsers,findByid , updateUser}