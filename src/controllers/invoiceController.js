const prisma = require('../utils/prismaUtil');
const HttpException = require('../utils/http-exception');

//Create a new invoice into the database
exports.createInvoice = async (req, res, next) => {
    const data = req.body;
    try {
      const invoice = await prisma.invoice.create({
        data,
      });
      res.status(201).json({
        status: "success",
        invoice,
      });
    } catch (error) {
      console.log("error:", error.message);
      next(new HttpException(422, error.message));
    }
  };
  
  //Check if inoice with the given id exist and update
  exports.updateInvoice = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const invoice = await prisma.invoice.update({
        where: {
          id
        },
        data,
      });
      res.status(201).json({
        status: "success",
        invoice,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(422, error.message));
    }
  };
  
  //Get all invoices
  exports.getAllInvoices = async (req, res, next) => {
    try {
      const invoices = await prisma.invoice.findMany({
        include: {
      User:true
        },
      });

      res.status(200).json({
        status: "success",
        invoices,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };
  
  //get a single course
  exports.getInvoice = async (req, res, next) => {
    const { id } = req.params.id;
    try {
      const invoice = await prisma.invoice.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(200).json({
        status: "success",
        invoice,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };
  
  //check if course with id and delete
  exports.deleteInvoice = async (req, res, next) => {
    try {
        const { id } = req.params.id 
        const invoice = await prisma.invoice.delete({
          where:{
            id
          }
        });
      
        if (!invoice) {
          const error = new HttpException("Invoice with this ID not found!", 404);
          return next(error);
        }
      
        res.status(204).json({
          status: "succesful",
          data: {
            id: parseInt(id),
          },
        })   
    } catch (error) {
        console.log(error.message);
        next(new HttpException(404, error.message)); 
    }
};