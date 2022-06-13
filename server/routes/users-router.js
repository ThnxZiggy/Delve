const express = require('express');
const router = express.Router();
const db = require('../configs/db.config');

router.get('/', (req, res) => {
  const usersArray = Object.values(users);
  res.json(usersArray);
});

router.post('/login', (req, res) => {
  const {user, password} = req.body;
  // console.log('User:', user)
  // console.log('Password:', password)

  // let usersArray;
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

module.exports = router;