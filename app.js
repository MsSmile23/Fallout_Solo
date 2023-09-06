require('@babel/register');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const indexRouter = require('./sourse/routes/index.router');

const app = express();
const Port = 3000;
const sessionConfig = {
  name: 'Fallout',
  store: new FileStore(), // добавить после установки session-file-store
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // устанавливаем сколько живет кука
    httpOnly: true,
  },
}

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(expressSession(sessionConfig));
app.use('/', indexRouter);

app.listen(Port, () => {
  console.log(`This server is runnig on port => ${Port}`);
});
