"use strict"

const express = require('express'),
	app = express(),
	path = require('path'),
	hbs = require('hbs'),
	publicDir = path.join(__dirname,'../public'),
	partialsDir = path.join(__dirname,'../partials'),
	bodyParser = require('body-parser'),
	courses = require('./courses'),
	students = require('./students')

require('./helpers')
hbs.registerPartials(partialsDir)

app.use(bodyParser.urlencoded({extended:false}))
	.use(express.static(publicDir))
	.set('view engine', 'hbs')

.get('/', (req, res) =>{
	res.render('index')
})
.get('/view', (req, res)=>{
	res.render('view',{
		page: 'view',
		pageTitle: 'Lista de Cursos',
		courses: courses.getCourses()
	})
})
.get('/create', (req, res)=>{
	res.render('create',{
		page: 'create',
		pageTitle: 'Crear Curso'
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
		available: true,
	}

	let response = courses.create(course)

	res.render('create', {
		page: 'create',
		pageTitle: 'Crear Curso',
		response: response
	})
})
.get('/subscribe', (req, res)=>{
	res.render('subscribe',{
		page: 'subscribe',
		pageTitle: 'Inscribir Alumnos',
		courses: courses.getCourses()
	})
})
.post('/subscribe', (req, res)=>{
	let student = {
		name: req.body.name,
		id: parseInt(req.body.id),
		email: req.body.email,
		phone: parseInt(req.body.phone),
		course: parseInt(req.body.course)
	}

	let response = students.create(student)

	res.render('subscribe',{
		page: 'subscribe',
		pageTitle: 'Inscribirse en un curso',
		courses: courses.getCourses(),
		response: response
	})
})
.get('/students', (req, res)=>{
	res.render('students',{
		page: 'students',
		pageTitle: 'Estudiantes Inscritos'
	})
})

app.listen(3000, ()=>{
	console.log('Escuchando en el puerto 3000')
})
