const prisma = require('../utils/prismaUtil');
const HttpException = require('../utils/http-exception');

//Create a new Client into the database
exports.createClient = async (req, res, next) => {
    const data = req.body;
    try {
      const client = await prisma.client.create({
        data,
      });
      res.status(201).json({
        status: "success",
        client,
      });
    } catch (error) {
      console.log("error:", error.message);
      next(new HttpException(422, error.message));
    }
  };
  
  //Check if client with the given id exist and update
  exports.updateClient = async (req, res, next) => {
    const { id } = req.params.id;
    const data = req.body;
    try {
      const client = await prisma.client.update({
        where: {
          id: parseInt(id),
        },
        data,
      });
      res.status(201).json({
        status: "success",
        client,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(422, error.message));
    }
  };
  
  //Get all clients
  exports.getAllClients = async (req, res, next) => {
    try {
      const clients = await prisma.client.findMany({});

      res.status(200).json({
        status: "success",
        clients,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };
  
  //get a single client
  exports.getClient = async (req, res, next) => {
    const { id } = req.params.id;
    try {
      const client = await prisma.client.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(200).json({
        status: "success",
        client,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };
  
  //check if Client with id and delete
  exports.deleteClient = async (req, res, next) => {
    try {
        const { id } = req.params.id 
        const client = await prisma.client.findByIdAndDelete({});
      
        if (!client) {
          const error = new HttpException("Client with this ID not found!", 404);
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