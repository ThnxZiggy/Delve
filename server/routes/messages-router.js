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

router.get('/:room', (req, res) => {
  const roomID = req.params.room;
  const messagesArray = Object.values(messages);
  const roomMessages = messagesArray.filter(message => message.room === roomID);

  res.send(roomMessages);
})

module.exports = router;