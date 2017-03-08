const express = require('express');
const router = express.Router();

//import C# library to convert to jpg
var edge = require('edge');
var getData = edge.func(`${__dirname}/../../lib/DBAccess.dll`)

//DB Access
router.get('/', (req, res) => {
  var params = {
    conn: process.env.CONN_STRING,
    orderId:0
  };
  getData(params, function(error, result){
    if(error) throw error;
    res.send(result);
  });
});

router.get('/:id', (req, res) => {
  var params = {
    conn: process.env.CONN_STRING,
    orderId: req.params.id * 1 //convert to number
   };
  getData(params, function(error, result){
    if(error) throw error;
    res.send(result);
  });
});
module.exports = router;
