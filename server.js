const express = require('express');
const log = require('./logger');

const app = express();
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  log('info', 'User visited Home Page');
  res.send('Hello, Winston Logs with SQL Server!');
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  log('info', `User attempted login: ${username}`);
  res.send('Login logged!');
});

app.listen(3000, () => {
  log('info', 'Server started on port 3000');
});
