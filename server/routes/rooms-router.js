const express = require('express');
const { route } = require('./todos-router');
const router = express.Router();
const db = require('../configs/db.config');

router.get('/', (req, res) => {
  const command = "SELECT * FROM rooms";
  db.query(command).then(data => {
    console.log(data.rows)
    res.send(data.rows);
  })
  // const roomsArray = Object.values(rooms);
  // res.send(roomsArray);
})

module.exports = router;
