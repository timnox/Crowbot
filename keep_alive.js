const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot est en vie !');
});

app.listen(3000, () => {
  console.log('Keep_alive is running!');
});
