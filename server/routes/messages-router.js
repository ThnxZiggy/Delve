const express = require('express');
const router = express.Router();
const db = require('../configs/db.config');

router.get('/:roomID', (req, res) => {
  const roomID = parseInt(req.params.roomID);

  const command = "SELECT messages.*, users.name AS author FROM messages JOIN users ON users.id = user_id WHERE room_id = $1";
  db.query(command, [roomID]).then((data) => {
    res.send(data.rows);
  })
})

router.post('/:roomID/:userID', (req, res) => {
  const roomID = parseInt(req.params.roomID);
  const userID = parseInt(req.params.userID);
  const content = req.body.currentMessage;
  
  const command = "INSERT INTO messages (room_id, user_id, content) VALUES ($1, $2, $3)";
  db.query(command, [roomID, userID, content]).then((data) => {
    res.status(201).send();
  })
})

module.exports = router;