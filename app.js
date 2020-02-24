import express from 'express';
import path from 'path';
import session from 'express-session';

const app = express()

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
  // TODO : check that user exists in database
  req.session.userInfo = req.body;
  res.redirect('/entry');
})

app.listen(3000);
console.log('app running on port ', 3000);
