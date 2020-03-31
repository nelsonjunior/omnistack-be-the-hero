const express = require('express');
const ongController = require('./controllers/ong-controller');
const incidentController = require('./controllers/incident-controller');
const profileController = require('./controllers/profile-controller');
const sessionController = require('./controllers/session-controller');

const routes = express.Router();

routes.get('/ongs/', ongController.index);
routes.post('/ongs/', ongController.create);
 
routes.get('/profile/', profileController.index);

routes.post('/session/', sessionController.index);

routes.get('/incidents/', incidentController.index);
routes.post('/incidents/', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);


/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após ? (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */
routes.post('/users/:id', (request, response) => {
    console.log('Teste Serviço');
    console.log(request.query);
    console.log(request.params);
    console.log(request.body);
    return response.json({
        evento: 'Semana OmniStack 11.0',
        aluno: 'nelson'
    });
});


module.exports = routes;