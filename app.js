const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); // Path to generated Swagger JSON
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();


// Initialize Express
const app = express();

app.use(cors());
// Middleware
app.use(bodyParser.json());


// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

// Routes
const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);

// Root Route
app.get('/', (req, res) => {
   res.send('API is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{ console.log(`Server running on port ${PORT}`);
console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});
