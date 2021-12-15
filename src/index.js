require('dotenv').config();
require('./db/mongoose');

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = require("../swagger.json")

const routes = require('./routes/index');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json({ limit: '50mb' })
);

const options = {
  explorer: true
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

// setup the logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan(':method :url :status - :response-time ms', { stream: accessLogStream }))

app.use('/', routes);

// 404 message
app.use(
  function(req, res, next){
    res.status(404).send({
			status: "error",
	    data: "Page not Found"
		});
  }
);

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});