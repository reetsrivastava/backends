const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');
const tweetRoutes = require('./routes/tweet.route');
const notificationRoutes = require('./routes/notification.route');

const cors = require('cors');
const bodyParser = require('body-parser');
const connectMongoDb = require('./db/db.connect.js');

//Middlewares
app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectMongoDb();


app.get('/', (req, res) => {
  
  res.send('Hello Express app!')
});
//Routes
app.use('/api', userRoutes);
app.use('/api', tweetRoutes);
app.use('/api', notificationRoutes);



app.listen(3000, () => {
	console.log('Server running at port 3000');
  console.log(process.env.SECRET_KEY);
});