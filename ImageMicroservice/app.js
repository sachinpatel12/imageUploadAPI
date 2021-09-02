var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer =require("multer");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//------------------------------------------------------------------------------
//storage engine for changing the formate of uploaded image
const storage = multer.diskStorage({
  destination:"./upload/images",
  //file name we are making is unique because if same file name is uploaded then image will get replaced so by date.now we will add millisecond to that file and for extension we are using path module
  filename:(req,file,callBack)=>
  {
    //callback has two parameter (err,result) so err is null for now and result is filename
return callBack(null,`${file.originalname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  //dest:"./upload/images"

  //instead of just destination now we are using our function storage which will cahnge the file and will show us original image but destination create the destination of not present butt storgage fun not

  storage:storage


})
//making the url of image express.static is helpful  To serve static files such as images, CSS files
app.use("/staticPath",express.static("upload/images"));

app.post("/uploadFile",upload.single("image"),(req,res)=>
{
  res.json({success:true,message:`http://localhost:3000/staticPath/${req.file.filename}`});
})
//------------------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
