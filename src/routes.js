const express = require('express');

const UserController = require('./controllers/UserController');
const ServiceController = require('./controllers/ServiceController');
const CategoryController = require('./controllers/CategoryController');
const ImageController = require('./controllers/ImageController');

const AuthController = require('./controllers/AuthController');


const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/login', AuthController.login);

//USER ROUTES
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.delete('/users/', UserController.deleteAll);
routes.delete('/users/:id', UserController.deleteForId);
routes.put('/users/:id', UserController.update);

//SERVICES ROUTES
routes.get('/services', ServiceController.index); //LISTA TODOS OS SERVICES
routes.get('/users/:user_id/services', ServiceController.listServiceForUser); //LISTA SERVICES POR USER
routes.get('/categories/:category_id/services', ServiceController.listServiceForCategory);//LISTA SERVICES POR CATEGORY
routes.post('/users/:user_id/services', ServiceController.store); // CRIA SERVICE


//CATEGORY ROUTES
routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.delete('/categories/', CategoryController.deleteAll);
routes.delete('/categories/:id', CategoryController.deleteForId);
routes.put('/categories/:id', CategoryController.update);

//IMAGES ROUTES
routes.get('/images', ImageController.index); //LISTA TODAS AS IMAGES
routes.get('/services/:service_id/images', ImageController.listImageForService); //LISTA IMAGES POR SERVICES
routes.post('/services/:service_id/images', ImageController.store); // CRIA IMAGE



module.exports = routes; 