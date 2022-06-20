const express = require('express');
const router = express.Router();
const db = require('../configs/db.config');

router.get('/', (req, res) => {
  const usersArray = Object.values(users);
  res.json(usersArray);
});

router.post('/login', (req, res) => {
  const {user, password} = req.body;
  const command = "SELECT * FROM users";
  db.query(command).then(data => {
    const usersArray = data.rows;
    const correctUser = usersArray.filter(item => item.name === user);
  
    if (correctUser.length <= 0) {
      res.send('error')
    }else if(correctUser[0].password === password) {
      res.send(correctUser)
    } else {
      res.send('error');
    }
  })
})

router.post('/signup', (req, res) => {
  const {user, password, email} = req.body;
  const command = "SELECT users.name FROM users;";
  db.query(command).then(data => {
    const allUserNames = [];
    for (let value of data.rows) {
      allUserNames.push(Object.values(value)[0]);
    }
    if (allUserNames.includes(user)) {
      return res.send('error')
    }
    const command = "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *;";
    db.query(command, [email, password, user]).then(data => {
      res.send(data.rows);
    })
  })
})

module.exports = router;