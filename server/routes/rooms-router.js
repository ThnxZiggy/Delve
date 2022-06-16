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
  console.log('session goal',roomData.sessionGoal)
  console.log('session goal type', typeof roomData.sessionGoal)
  console.log('SO test', roomData.sessionGoal.match(/^[0-9]+$/));
  if (roomData.sessionGoal.match(/^[0-9]+$/) === null || parseInt(roomData.sessionGoal) <= 0) {
    return res.send('Session goal must be a number above 0');
  }
  const command = "SELECT users.name FROM users;"
  db.query(command).then(data => {
    const userList = data.rows.map(obj => obj = obj.name);
    console.log(userList);
    for (let item in roomData) {
      if (roomData[item] === '') {
        roomData[item] = null;
      } else if (item !== 'name' && item !== 'sessionGoal' && !userList.includes(roomData[item])) {
        console.log(`${roomData[item]} is not a Delve member`);
        return res.send(`${roomData[item]} is not a Delve member`);
      }
    }
    const {name, user2, user3, user4, sessionGoal} = roomData;
    const command = "SELECT * FROM users WHERE name = $1 OR name = $2 OR name = $3;";
    db.query(command, [user2, user3, user4]).then(data => {
      // console.log(data.rows);
      const user2ID = data.rows[0] ? data.rows[0].id : null; 
      const user3ID = data.rows[1] ? data.rows[1].id : null; 
      const user4ID = data.rows[2] ? data.rows[2].id : null;

      if (user2ID === user1ID || user3ID === user1ID || user3ID === user1ID) {
        return res.send('You cannot add yourself to a room... get some friends.')
      }
  
      const command = "INSERT INTO rooms (name, user_1_id, user_2_id, user_3_id, user_4_id, session_goal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
      db.query(command, [name, user1ID, user2ID, user3ID, user4ID, sessionGoal]).then(data => {
        console.log('data', data)
        res.status(201).send(data);
      })
    })
  })
})

router.post('/session/:roomID', (req, res) => {
  const roomID = req.params.roomID;
  const command = "UPDATE rooms SET session_number = session_number + 1 WHERE id = $1;";
  db.query(command, [roomID]).then(data => {
    res.status(201).send();
  })
})

router.get('/members/:roomID', (req, res) => {
  const roomID = req.params.roomID;
  const command = "SELECT users.* FROM rooms JOIN users ON users.id = user_1_id OR users.id = user_2_id OR users.id = user_3_id OR users.id = user_4_id WHERE rooms.id = $1;";
  db.query(command, [roomID]).then(data => {
    res.send(data.rows);
  })
})

router.put('/delete/:roomID', (req, res) => {
  const roomID = req.params.roomID;
  const command = "DELETE FROM rooms WHERE rooms.id = $1 RETURNING *";
  db.query(command, [roomID]).then(data => {
    res.send(data);
  })
})

router.put('/members/add/:roomID', (req,res) => {
  const roomID = req.params.roomID;
  const userName = req.body.userName;
  const command = "SELECT * FROM users;"
  db.query(command).then(data => {
    const userList = data.rows.map(obj => obj = obj.name);
    console.log(userList);
    console.log(userName);
    if (!userList.includes(userName)) {
      res.send(`${userName} is not a Delve member.`);
      return;
    }
    const addedUser = data.rows.filter(obj => obj.name === userName)[0];
    const command = "SELECT user_2_id, user_3_id, user_4_id FROM rooms WHERE id = $1;";
    db.query(command, [roomID]).then(data => {
      let availableSpot;
      const userSpots = data.rows[0];
      for (let spot in userSpots){
        if (userSpots[spot] === null) {
          availableSpot = spot;
          break;
        }
      }
      console.log('------------')
      console.log(availableSpot);
      console.log(addedUser.id);
      console.log(roomID);
      console.log('------------')
      const command = `UPDATE rooms SET ${availableSpot} = ${addedUser.id} WHERE id = ${roomID};`;
      db.query(command).then(data => {
        console.log('updated');
        res.send('success');
      })
    })
  })
})

module.exports = router;
