require('@babel/register');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./sourse/routes/index.router');

const app = express();
const Port = 3000;

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(morgan('dev'));
app.use('/', indexRouter);

app.listen(Port, () => {
  console.log(`This server is runnig on port => ${Port}`);
});
