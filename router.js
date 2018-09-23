const APP_HOST = process.env.APP_HOST;
const express = require('express');
const Controller = require('./app/controllers');

/* =========================== ROUTE MIDDLEWARE ============================ */

module.exports = (app) => {

  // Initializing route groups
  const apiRoutes = express.Router(),
    exerciseRoutes = express.Router();

  //= ========================
  // Exercise Routes
  //= ========================

  // Set book routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/exercise', exerciseRoutes);

  // Create new user
  // Returns fail status + message -or- user object
  exerciseRoutes.post('/new-user', Controller.newUser);

  // Get all users
  // Returns fail status + message -or- array of user objects
  exerciseRoutes.get('/users', Controller.getUsers);

  // Create new exercise
  // Returns fail status + message -or- user object and new exercise object
  exerciseRoutes.post('/add', Controller.newExercise);

  // Get exercise log for user
  // Returns fail status + message -or- array of user exercises
  // Optional query:
  //  from (Date yyyy-mm-dd)
  //  to (Date yyyy-mm-dd)
  //  limit (int)
  exerciseRoutes.get('/log', Controller.getUserLog);

  // Set url for API group routes
  app.use('/api', apiRoutes);

};