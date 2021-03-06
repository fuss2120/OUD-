import "babel-polyfill";
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import { initializeDatabasePool } from './Models/dbPool';
import Message from './Models/Message';
import databaseCredentials from './config/database';
import { login, patient, chat } from './Services';

const app = express()
const server = createServer(app);
chat.initilizeSocketServer(server);
dotenv.config();
Message.initializeTwilio();
const NODE_ENV = process.env.NODE_ENV;
const dbConfig = databaseCredentials[NODE_ENV];

initializeDatabasePool(dbConfig);

const static_dir = path.resolve('View') + '/';

app.use(express.json())
app.use(express.static('View'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret hash' }));

app.get('/test', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your test is working'});
})

app.get('/', (req, res) => {
  res.sendFile(static_dir + 'Login.html');
})

app.get('/HomePage', (req, res) => {
  res.sendFile(static_dir + 'HomePage.html');
})

app.get('/Message', (req, res) => {
  res.sendFile(static_dir + 'Message.html');
})

app.get('/Patients', (req, res) => {
  res.sendFile(static_dir + 'Patients.html');
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
    return res.send({"success": false, "errorMessage": error.message});
  })
})

app.get('/database', (req, res) => {
  res.sendFile(static_dir + 'database.html');
})

app.get('/all_patient_data', (req, res) => {
  patient.getAllPatientsData()
  .then(results => {
    return res.send({"success": true, "results": results});
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"success": false, "errorMessage": error.message})
  })
})

app.post('/send_message', (req, res) => {
  const messageText = req.body.message;
  const user = req.session.user;
  const pid = req.body.pid;
  chat.sendMessageFromUserToPid(messageText, user, pid)
  .then(() => {
    return res.send({"success": true});
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"success": false, "errorMessage": error.message});
  })
})

app.post('/sms', (req, res) => {
  const sender = req.body.From;
  const message = req.body.Body;
  chat.logMessageFromPhoneNumber(message, sender)
  .then(() => {
    return res.send({"success": true});
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"success": false, "errorMessage": error.message});
  })
})

app.get('/patient_name', (req, res) => {
  const pid = req.query.pid;
  patient.getPatientNameFromPid(pid)
  .then(name => {
    return res.send({"success": true, "result": name});
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"success": false, "errorMessage": error.message})
  })
})

app.get('/patient_messages', (req, res) => {
  const pid = req.query.pid;
  chat.getPatientMessagesFromPid(pid)
  .then(results => {
    return res.send({"success": true, "results": results});
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"success": false, "errorMessage": error.message})
  })
})

app.get('/category_list', (req, res) => {
  patient.getPatientCategoryList()
  .then(results => {
    return res.send({"success": true, "results": results});
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"success": false, "errorMessage": error.message})
  })
})

app.get('/mass_text', (req, res) => {
  res.sendFile(static_dir + 'MassText.html');
})

app.post('/send_text_to_category', (req, res) => {
  const categoryId = req.body.categoryId;
  const message = req.body.message;
  const user = req.session.user;
  chat.sendTextToCategoryIdFromUser(message, categoryId, user)
  .then(() => {
    return res.send({"success": true});
  })
  .catch(error => {
    console.log(error.message);
    return res.send({"success": false, "errorMessage": error.message});
  })
})

server.listen(3000);
console.log('app running on port ', 3000);
