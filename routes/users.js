var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/hi', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/uploadFile",(req,res)=>
{
  res.send("hii");
})
module.exports = router;
