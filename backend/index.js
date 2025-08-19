require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const ProductsRoutes = require('./routes/products.js')
/**
  models: for the schema DB
  controllers: for the get|post|patch|delete actions
  routes: for the routing system using express
 */

const app = express();

// middleware
app.use(cors());
app.get("/", (req, res) => {
    res.send("السلام عليكم ورحمه الله وبركاته")
})
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

  
//  Routes
app.use('/api/products', ProductsRoutes)
  
//* this is a sample one -> change your own in the .env
const DB_URI = process.env.MONGODB_URL || 'mongodb+srv://webminds:webminds@cluster0.ym3s3qz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB database using Mongoose
mongoose.connect(DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => {
        console.log('Connected to database successfully')
        app.listen(4000, () => {
            console.log('Backend server is running on http://localhost:4000');
        })
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        console.error('Please ensure:');
        console.error('1. Your IP address is whitelisted in MongoDB Atlas');
        console.error('2. Your credentials are correct');
        console.error('3. Your cluster is active');
        process.exit(1);
    })
  