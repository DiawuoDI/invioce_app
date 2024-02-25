const { Router } = require("express");
const itemRouter = Router();

const itemController = require("../controllers/itemController");


itemRouter.route('/')
    .post(itemController.createItem)
    .get(itemController.getAllItems)
    
itemRouter.route('/:id')
    .get( itemController.getItem)
    .patch(itemController.updateItem)
    .delete( itemController.deleteItem)


module.exports = itemRouter   