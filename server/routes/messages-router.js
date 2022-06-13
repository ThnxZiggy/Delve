const express = require('express');
const router = express.Router();
const db = require('../configs/db.config');

const messages = {
  a: {
    id: "a",
    author: "Ziggy", 
    message: "Hey guys how's it going", 
    room: "1",
    time: "14:30"
  },
  b: {
    id: "b",
    author: "Nadya", 
    message: "good good", 
    room: "1",
    time: "14:30"
  },
  c: {
    id: "c",
    author: "Ziggy", 
    message: "nice", 
    room: "1",
    time: "14:30",
  },
  d: {
    id: "d",
    author: "Ziggy", 
    message: "Let's do this!", 
    room: "3",
    time: "14:30"
  },
  e: {
    id: "e",
    author: "Nadya", 
    message: "woot wooooot",
    room: "3",
    time: "14:30"
  },
}

router.get('/:roomID', (req, res) => {
  const roomID = parseInt(req.params.roomID);

  const command = "SELECT messages.*, users.name AS author FROM messages JOIN users ON users.id = user_id WHERE room_id = $1";
  db.query(command, [roomID]).then((data) => {
    res.send(data.rows);
  })
})

module.exports = router;