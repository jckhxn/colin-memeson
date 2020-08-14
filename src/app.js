const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
var path = require("path")
const cors = require('cors');


const makeMeme = (topText,bottomText) => {
  
 const { createCanvas,loadImage} = require('canvas')

  loadImage('./colin1.jpg').then(image => {
    const canvas = createCanvas(960,500);
    
   const ctx = canvas.getContext('2d')
  ctx.drawImage(image, (960  - 500) / 200 ,0 );
  ctx.fillStyle = "transparent"
  ctx.fillRect(0, 0, 960, 500)

  ctx.font = "30px Comic Sans MS"
  ctx.fillStyle = "black"
  
  ctx.textAlign = "center"

  ctx.fillText(`${topText}`, (960 / 2), 28)
  ctx.fillText(`${bottomText}`, (960 / 2), 500 - 5)

  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('./src/public/test.png', buffer)
  
   
  

  
  }

  )
}

require('dotenv').config();

const middlewares = require('./middlewares');


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
var dir = path.join(__dirname, 'public');
 app.use(express.static(dir));

app.get('/', (req, res) => {

  res.send('')
    
 

});

app.get('/:topText/:bottomText',async (req, res) => {
    const response = await makeMeme(req.params.topText,req.params.bottomText)
    res.sendFile(path.join(__dirname, '/public/test.png'));
  });

  app.get('/:topText',async (req, res) => {
    const response = await makeMeme(req.params.topText,"")
    res.sendFile(path.join(__dirname, '/public/test.png'));
  });



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
