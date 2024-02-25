const { Router } = require("express");
const clientRouter = Router();

const clientController = require('../controllers/clientContoller');


clientRouter.route('/')
    .post(clientController.createClient)
    .get(clientController.getAllClients)
    
clientRouter.route('/:id')
    .get( clientController.getClient)
    .patch(clientController.updateClient)
    .delete( clientController.deleteClient)


module.exports = clientRouter   