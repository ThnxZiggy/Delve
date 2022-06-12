const express = require('express');
const router = express.Router();

const users = {
  abc: {
    id: "abc",
    name: "Nadya",
    email: "Nadya@gmail.com",
    password: "1234"
  },
  def: {
    id: "def",
    name: "Ziggy",
    email: "Ziggy@gmail.com",
    password: "1234"
  },
  ghi: {
    id: "ghi",
    name: "Nathan",
    email: "Nathan@gmail.com",
    password: "1234"
  }
}

router.get('/', (req, res) => {
  const usersArray = Object.values(users);
  res.json(usersArray);
});

router.post('/login', (req, res) => {
  const {user, password} = req.body;
  console.log('User:', user)
  console.log('Password:', password)

  const usersArray = Object.values(users);
  const correctUser = usersArray.filter(item => item.name === user);

  if (correctUser.length <= 0) {
    res.send('error')
  }
  if(correctUser[0].password === password) {
    res.send(correctUser)
  } else {
    res.send('error');
  }
})

module.exports = router;