require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');

//import routes
const userRoutes = require('./routes/user.route');
const houseRoutes = require('./routes/house.route');

const app = express();

app.use(express.json({ limit: '1mb' }));

connectDB();
const port = process.env.PORT || 6666;

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'home page 🍟🍟🍟🍟🍟' });
});

// mount
app.use('/api/users', userRoutes);
app.use('/api/house', houseRoutes);

//404 page
app.all('*', (req, res) => {
  res.status(404).json({ message: '👋🤚👋👋👋🤚oops page not found' });
});



app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
