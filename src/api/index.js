const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Landing page for meme api.')
});


module.exports = router;
