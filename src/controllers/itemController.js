const prisma = require('../utils/prismaUtil');
const HttpException = require('../utils/http-exception');

//Create a new iten into the database
exports.createItem = async (req, res, next) => {
    const data = req.body;
    try {
      const item = await prisma.item.create({
        data,
      });
      res.status(201).json({
        status: "success",
        item,
      });
    } catch (error) {
      console.log("error:", error.message);
      next(new HttpException(422, error.message));
    }
  };
  
  //Check if inoice with the given id exist and update
  exports.updateItem = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const item = await prisma.item.update({
        where: {
          id,
        },
        data,
      });
      res.status(201).json({
        status: "success",
        item,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(422, error.message));
    }
  };
  
  //Get all invoices
  exports.getAllItems = async (req, res, next) => {
    try {
      const items = await prisma.item.findMany({});

      res.status(200).json({
        status: "success",
        items,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };
  
  //get a single Item
  exports.getItem = async (req, res, next) => {
    const { id } = req.params;
    try {
      const item = await prisma.item.findUnique({
        where: { 
          id
         },
      });
      res.status(200).json({
        status: "success",
        item,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };
  
  //check if Item with id and delete
  exports.deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const item = await prisma.item.delete({
          where:{
            id
          }
        });
      
        if (!item) {
          const error = new HttpException("Item with this ID not found!", 404);
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