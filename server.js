const express = require('express');
const app = express();

const PORT =  process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
	res.json({ok: true});
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = {app};