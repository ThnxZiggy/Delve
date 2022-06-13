const express = require('express');
const { route } = require('./todos-router');
const router = express.Router();
const db = require('../configs/db.config');

router.get('/', (req, res) => {
  const command = "SELECT * FROM rooms;";
  db.query(command).then(data => {
    console.log(data.rows)
    res.send(data.rows);
  })
  // const roomsArray = Object.values(rooms);
  // res.send(roomsArray);
})

router.post('/:userID', (req, res) => {
  const user1ID = req.params.userID;
  const roomData = req.body;
  for (let data in roomData) {
    if (roomData[data] === '') {
      roomData[data] = null;
    }
  }
  const {name, user2, user3, user4} = roomData;
  const command = "SELECT * FROM users WHERE name = $1 OR name = $2 OR name = $3;"
  db.query(command, [user2, user3, user4]).then(data => {
    const user2ID = data.rows[0].id;
    const user3ID = data.rows[1].id;
    const user4ID = data.rows[2].id;

    const command = "INSERT INTO rooms (name, user_1_id, user_2_id, user_3_id, user_4_id) VALUES ($1, $2, $3, $4, $5)"
    db.query(command, [name, user1ID, user2ID, user3ID, user4ID]).then(data => {
      res.status(201).send();
    })
  })

})

module.exports = router;
