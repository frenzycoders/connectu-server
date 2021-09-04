
const express = require('express');
const app = express();
const server = require('http').createServer(app);
require('./socket/socket')(server);

const mongoose = require('mongoose');
const projectDetails = require('./projectDetails.json');
const cors = require('cors');
const { utils } = require('./utils');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public/', express.static("public"));

require('./Connection')(projectDetails);

utils.redisClient.connect().then(() => console.log('REDIS CONNECTION: TRUE')).catch((err) => console.log(err));

app.use((req, res, next) => {
  const startTime = Date.now();
  req.on("end", () => {
    const endTime = Date.now();
    const vals = {
      method: req.method,
      path: req.path,
      time: endTime - startTime,
    };
    console.log(req.method + " " + req.path + " " + res.statusCode + " " + endTime - startTime + "ms");
  });
  next();
})

require('./Config')(app);

server.listen(4000, (err) => {
  console.log('server is running on ===> http://localhost:3000');
})