const express = require('express');
const { route } = require('./todos-router');
const router = express.Router();

const rooms = {
  a: {
    id: "a",
    name: "sewing",
    members: [],
  },
  b: {
    id: "b",
    name: "dancing",
    members: [],
  },
  c: {
    id: "c",
    name: "regex",
    members: [],
  },
  d: {
    id: "d",
    name: "drawing",
    members: [],
  },
}

router.get('/', (req, res) => {
  const roomsArray = Object.values(rooms);
  res.send(roomsArray);
})

module.exports = router;
