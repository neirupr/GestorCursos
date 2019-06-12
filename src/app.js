	"use strict"

	const express = require('express'),
		app = express(),
		path = require('path'),
		hbs = require('hbs'),
		publicDir = path.join(__dirname,'../public'),
		partialsDir = path.join(__dirname,'../partials'),
		bodyParser = require('body-parser'),
		courses = require('./courses'),
		students = require('./students'),
		privileges = require('./privileges'),
		users = require('./users'),
		displayLogin = (res, params) =>{
			res.render('login', params)
		}

	let currentUser = undefined

	require('./helpers')
	hbs.registerPartials(partialsDir)

	app.use(bodyParser.urlencoded({extended:false}))
		.use(express.static(publicDir))
		.set('view engine', 'hbs')

	.get('/', (req, res) =>{
		if(currentUser !== undefined){
			res.render('index', {
				pageTitle: 'Gestor de Cursos',
				developers: [
					'Andersson Villa',
					'Gabriel Rodríguez',
					'Neiro Torres'
				],
				user: currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
		} else {
			displayLogin(res, {pageTitle: 'Iniciar sesión'})
		}
	})
	.get('/view', (req, res)=>{
		if(currentUser !== undefined){
			res.render('listCourses',{
				page: 'view',
				pageTitle: 'Lista de Cursos',
				courses: courses.getCourses(),
				user: currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
		} else {
			displayLogin(res, {pageTitle: 'Iniciar sesión'})
		}
	})
	.get('/create', (req, res)=>{
		if(currentUser !== undefined){
			res.render('createCourse',{
				page: 'create',
				pageTitle: 'Abrir Curso',
				user: currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
		} else {
			displayLogin(res, {pageTitle: 'Iniciar sesión'})
		}
	})
	.get('/subscribe', (req, res)=>{
		if(currentUser !== undefined){
			res.render('subscribe',{
				page: 'subscribe',
				pageTitle: 'Inscribirse en un Curso',
				courses: courses.getCourses(),
				user: currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
		} else {
			displayLogin(res, {pageTitle: 'Iniciar sesión'})
		}
	})
	.get('/students', (req, res)=>{
		if(currentUser !== undefined){
			res.render('listStudents',{
				page: 'students',
				pageTitle: 'Estudiantes Inscritos',
				courses: courses.getCourses(),
				students: users.getUsers(),
				subscriptions: students.getStudents(),
				user: currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
		} else {
			displayLogin(res, {pageTitle: 'Iniciar sesión'})
		}
	})
	.get('/newuser', (req, res)=>{
			res.render('newUser', {
				page: 'newuser',
				pageTitle: 'Registrar nuevo usuario',
				user: currentUser,
			
			})
			
	})
	.get('/courseList', (req, res)=>{
		if(currentUser !== undefined){
			res.render('listMyCourses', {
				page: 'courseList',
				pageTitle: 'Mis cursos',
				user: currentUser,
				courses: courses.getCourses(),
				subscriptions: students.getSubcribedCourses(currentUser.id),
				student:currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
		} else {
			displayLogin(res, {pageTitle: 'Iniciar sesión'})
		}	
	})

	.post('/courseList', (req, res)=>{
		let method = req.body.method,
			id = parseInt(req.body.id),
			course = parseInt(req.body.course),
			response = students.cancel(id, course)

			res.render('listMyCourses', {
				page: 'courseList',
				pageTitle: 'Mis cursos',
				courses: courses.getCourses(),
				student:currentUser,
				subscriptions: students.getSubcribedCourses(currentUser.id),
				response: response,
				user: currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
	})
	.post('/create', (req, res)=>{
		let course = {
			name: req.body.name,
			id: parseInt(req.body.id),
			description: req.body.description,
			price: parseFloat(req.body.price),
			modality: req.body.modality,
			intensity: parseFloat(req.body.intensity) || 0,
			available: true
		}

		let response = courses.create(course)

		res.render('createCourse', {
			page: 'create',
			pageTitle: 'Abrir Curso',
			response: response,
			user: currentUser,
			userAccess: privileges.getPrivileges(currentUser.type)
		})
		console.log(currentUser);
	})
	.post('/subscribe', (req, res)=>{
		let register = {
			course: parseInt(req.body.course),
			student: parseInt(req.body.id)
		}

		let response = students.subscribe(register)

		res.render('subscribe',{
			page: 'subscribe',
			pageTitle: 'Inscribirse en un curso',
			courses: courses.getCourses(),
			response: response,
			user: currentUser,
			userAccess: privileges.getPrivileges(currentUser.type)
		})
	})
	.post('/students', (req, res)=>{
		let method = req.body.method,
			id = parseInt(req.body.id),
			response

		if(method !== 'delete'){
			response = courses.close(id)
		
			res.render('listStudents', {
				page: 'students',
				pageTitle: 'Estudiantes Inscritos',
				courses: courses.getCourses(),
				students: users.getUsers(),
				subscriptions: students.getStudents(),
				response: response,
				user: currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
		} else {
			let course = parseInt(req.body.course)

			response = students.cancel(id, course)

			res.render('listStudents', {
				page: 'students',
				pageTitle: 'Estudiantes Inscritos',
				courses: courses.getCourses(),
				students: users.getUsers(),
				subscriptions: students.getStudents(),
				response: response,
				user: currentUser,
				userAccess: privileges.getPrivileges(currentUser.type)
			})
		}
	})
	.post('/login', (req, res)=>{
		let _username = req.body.username,
			_password = req.body.password,
			response = users.findUser(_username, _password)

		if(response.success === 'success'){
			currentUser = response.user
			res.redirect('/')
		} else {
			displayLogin(res, {
				pageTitle: 'Iniciar sesión',
				response: response
			})
		}
	})
	.post('/newUser', (req, res)=>{
		let newUser = {
			name: req.body.name,
			id: parseInt(req.body.id),
			email: req.body.email,
			password: req.body.password,
			phone: parseInt(req.body.phone),
			type: 'student'
		},
		response = users.createUser(newUser)

		res.render('newUser', {
			page: 'newuser',
			pageTitle: 'Registrar nuevo usuario',
			response: response,
			user: currentUser,
			
		})	
	}).get('/logout',(req, res)=>{
		currentUser = undefined;
		displayLogin(res, {pageTitle: 'Iniciar sesión'})
	})








	.get('*', (req, res)=>{
		if(currentUser !== undefined){
			res.render('index', {
				pageTitle: 'Gestor de Cursos',
				developers: [
					'Andersson Villa',
					'Gabriel Rodríguez',
					'Neiro Torres'
				]
			})
		} else {
			displayLogin(res, {pageTitle: 'Iniciar sesión'})
		}
	})

	app.listen(3000, ()=>{
		console.log('Escuchando en el puerto 3000')
	})
