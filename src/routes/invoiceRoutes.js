const { Router } = require("express");
const invoiceRouter = Router();

const invoiceController = require("../controllers/invoiceController");


invoiceRouter.route('/')
    .post(invoiceController.createInvoice)
    .get(invoiceController.getAllInvoices)
    
invoiceRouter.route('/:id')
    .get( invoiceController.getInvoice)
    .patch(invoiceController.updateInvoice)
    .delete( invoiceController.deleteInvoice)


module.exports = invoiceRouter   