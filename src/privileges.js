"use strict"

const getPrivileges = (type) =>{
	let access = [
			{
				'name': 'view',
				'path': '/view',
				'caption': 'Listar Cursos'
			}
		]

	if(type === 'admin'){
		access.push({
				'name': 'create',
				'path': '/create',
				'caption': 'Abrir Curso'
			},
			{
				'name': 'students',
				'path': '/students',
				'caption': 'Listar Inscritos'
			},
			{
				'name': 'newuser',
				'path': '/newuser',
				'caption': 'Nuevo Usuario'
			})
	} else {
		access.push({
				'name': 'subscribe',
				'path': '/subscribe',
				'caption': 'Inscribirse'
			},
			{
				'name': 'cursos',
				'path': '/courseList',
				'caption': 'Mis Cursos'
			})
	}

	return access
}

module.exports = { getPrivileges }