const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const ProductRouter = require("./routes/productrouter")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


require("dotenv").config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());



const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Resful-API-SEShop',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express for SE Shop',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Bowornlak Yookong',
      url: 'https://github.com/sofekung0726',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.send("<h1> Welcome to restful API Blog</h1>");
});
app.use("/products", ProductRouter)

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});