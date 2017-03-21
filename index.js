const express = require('express'),
      multer = require( 'multer'),
      path = require( 'path'),
      fs = require('fs');

// multer
const upload = multer({ dest: 'uploads/'});

// express
const app = express();

//port
const port = process.env.PORT || 3000;


// express set up

app.set('views', './views');
app.set('view engine', 'pug');


// routes

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('uploadFile'), (req, res) => {
  fs.unlink(req.file.path, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log(req.file.filename+' is deleted');
    }
    res.json({
      fileSize: req.file.size
    });
  });
});



app.listen(port, () => { console.log('running at port 3000')});
