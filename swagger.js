const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Item API',
    description: 'API documentation for managing items',
  },
  host: 'localhost:5000/api/items', // Update with the correct host/port
  schemes: ['https', 'https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/itemRoutes.js']; // Path to your route files

swaggerAutogen(outputFile, endpointsFiles, doc);
