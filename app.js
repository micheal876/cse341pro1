const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); // Path to generated Swagger JSON
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./passport-setup');
const swaggerJsDoc = require('swagger-jsdoc');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(cors()); // Use CORS before routes
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(session({
   secret: '2b30185c27d64f72680cf95492e23eec2ceca349',
   resave: false,
   saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes for GitHub authentication
app.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
   // Successful authentication
   res.redirect('/dashboard'); // Redirect to a protected route
});

// Logout route
app.get('/logout', (req, res) => {
   req.session.destroy(err => {
       if (err) {
           return res.status(500).send('Logout failed');
       }
       res.redirect('/');
   });
});

// Protected route
app.get('/dashboard', (req, res) => {
   if (!req.isAuthenticated()) {
       return res.status(401).send('You are not authenticated');
   }
   res.send(`Welcome ${req.user.username}`);
});

// Swagger setup
const swaggerOptions = {
   swaggerDefinition: {
       swagger: '2.0',
       info: {
           title: 'Items API',
           description: 'API documentation for items with authentication',
           version: '1.0.0',
       },
       paths: {
           '/auth/github': {
               get: {
                   summary: 'Authenticate with GitHub',
                   responses: {
                       200: {
                           description: 'Successful authentication',
                       },
                   },
               },
           },
           '/auth/github/callback': {
               get: {
                   summary: 'GitHub OAuth callback',
                   responses: {
                       200: {
                           description: 'Successful login',
                       },
                   },
               },
           },
           '/logout': {
               get: {
                   summary: 'Logout user',
                   responses: {
                       200: {
                           description: 'Successfully logged out',
                       },
                   },
               },
           },
           '/protected-route': {
               get: {
                   summary: 'Protected route',
                   security: [
                       { api_key: [] },
                   ],
                   responses: {
                       200: {
                           description: 'Authorized access',
                       },
                       401: {
                           description: 'Unauthorized',
                       },
                   },
               },
           },
       },
   },
   apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use your routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

// Root Route
app.get('/', (req, res) => {
   res.send('API is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
   console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});
