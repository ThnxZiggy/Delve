const express = require('express');
const { route } = require('./todos-router');
const router = express.Router();
const db = require('../configs/db.config');

router.get('/', (req, res) => {
  const command = "SELECT * FROM rooms ORDER BY id;";
  db.query(command).then(data => {
    // console.log(data.rows);
    res.send(data.rows);
  })
  // const roomsArray = Object.values(rooms);
  // res.send(roomsArray);
})

router.post('/:userID', (req, res) => {
  const user1ID = req.params.userID;
  const roomData = req.body;
  const command = "SELECT users.name FROM users;"
  db.query(command).then(data => {
    const userList = data.rows.map(obj => obj = obj.name);
    console.log(userList);
    for (let item in roomData) {
      if (roomData[item] === '') {
        roomData[item] = null;
      } else if (item !== 'name' && !userList.includes(roomData[item])) {
        console.log(`${roomData[item]} is not a Delve member`);
        return res.send(`${roomData[item]} is not a Delve member`);
      }
    }
    const {name, user2, user3, user4} = roomData;
    const command = "SELECT * FROM users WHERE name = $1 OR name = $2 OR name = $3;";
    db.query(command, [user2, user3, user4]).then(data => {
      console.log(data.rows);
      const user2ID = data.rows[0] ? data.rows[0].id : null; 
      const user3ID = data.rows[1] ? data.rows[1].id : null; 
      const user4ID = data.rows[2] ? data.rows[2].id : null; 
  
      const command = "INSERT INTO rooms (name, user_1_id, user_2_id, user_3_id, user_4_id) VALUES ($1, $2, $3, $4, $5)"
      db.query(command, [name, user1ID, user2ID, user3ID, user4ID]).then(data => {
        res.status(201).send('success');
      })
    })
  })
})

router.post('/session/:roomID', (req, res) => {
  const roomID = req.params.roomID;
  command = "UPDATE rooms SET session_number = session_number + 1 WHERE id = $1;";
  db.query(command, [roomID]).then(data => {
    res.status(201).send();
  })
})

module.exports = router;
