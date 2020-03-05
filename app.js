import "babel-polyfill";
import express from 'express';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import { initializeDatabasePool } from './models/dbPool';
import databaseCredentials from './config/database';
import { login, patient } from './services';

const app = express()
dotenv.config();
const NODE_ENV = process.env.NODE_ENV;
const dbConfig = databaseCredentials[NODE_ENV];

initializeDatabasePool(dbConfig);

const static_dir = path.resolve('static_content') + '/';

app.use(express.json())
app.use(express.static('static_content'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret hash' }));

app.get('/test', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your test is working'});
})

app.get('/', (req, res) => {
  res.sendFile(static_dir + 'index.html');
})

app.get('/entry', (req, res) => {
  res.sendFile(static_dir + 'entry.html');
})

app.post('/login', (req, res) => {
  login.logUserInWithFormData(req.body)
  .then(user => {
    req.session.user = user;
    return res.send({"success" : true})
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"sucess": false, "errorMessage": error.message});
  })
})

app.post('/enter_user', (req, res) => {
  patient.createPatientWithFormData(req.body)
  .then(() => {
    return res.send({"success": true});
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"success": false, "errorMessage": error,message});
  })
})

app.listen(3000);
console.log('app running on port ', 3000);
