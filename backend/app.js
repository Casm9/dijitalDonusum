const express = require('express');
const cors = require('cors');
const sequelize = require('./database/config');
const seedDatabase = require('./seed/seedDatabase');

const questionRoutes = require('./routes/questions');
const resultRoutes = require('./routes/result');
const formRoutes = require('./routes/form');
const evaluateRoutes = require('./routes/evaluate');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', questionRoutes);
app.use('/api', resultRoutes);
app.use('/api', formRoutes);
app.use('/api', evaluateRoutes);

sequelize.sync({ force: false }).then(() => {
  seedDatabase();
});

module.exports = app;