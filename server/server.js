const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))