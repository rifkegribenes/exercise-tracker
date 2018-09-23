const Exercise = require('../models/exercise');
const User = require('../models/user');

// add new user
exports.newUser = (req, res, next) => {
  const user = req.body;
  console.log(user);

    const newUser = new User({
      username: user.username
    });
    console.log(newUser);

    newUser.save()
      .then((user) => {
        console.log('new user saved');
        console.log(user);
        return res.status(200).json({ user });
      })
      .catch((err) => {
        console.log(`controller > newUser: ${err}`);
      return handleError(res, err);
      });
}


// Get all users
exports.getUsers = (req, res, next) => {
  User.find()
  	.then((users) => {
    	return res.status(200).json({ users });
  	})
  	.catch((err) => {
  		console.log(`controller > getUsers: ${err}`);
  		return handleError(res, err);
  	});
};

// Get all exercises for one user.
// params = userId (required)
//  to (date, optional)
//  from (date, optional)
//  limit (integer, optional)
exports.getUserLog = (req, res, next) => {
  console.log(`Controller > getUserLog: ${req.query.userId}`);
  const { userId, from, to, limit } = req.query;
  console.log(userId, from, to, limit);
  const dateFrom = !from ? new Date(0) : new Date(from);
  const dateTo = to ? new Date(to) : new Date();
  const recordLimit = limit ? parseInt(limit) : 100;
  console.log(userId, dateFrom, dateTo, recordLimit);

  Exercise.find({
    userId: userId,
    date: {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo)
    }
  })
    .limit(recordLimit)
    .then((exercises) => {
      console.log(exercises);
      return res.status(200).json({ exercises });
    })
    .catch((err) => {
      console.log(`controller > getUserLog: ${err}`);
      return handleError(res, err);
    });
};

exports.newExercise = (req, res, next) => {
  const exercise = req.body;
  console.log(exercise);

  const { date } = exercise;

    if (!date) {
      exercise.date = new Date();
    } else {
      exercise.date = new Date(date);
    }
    console.log(exercise.date);

    const newExercise = new Exercise({
      userId: exercise.userId,
      description: exercise.description,
  		duration: exercise.duration,
  		date: exercise.date
    });
    console.log(newExercise);

    newExercise.save()
	    .then((exercise) => {
	      console.log('new exercise saved');
	      console.log(exercise);
        User.findById(exercise.userId)
          .then((user) => {
            const response = {
              username: user.username,
              _id: exercise._id,
              description: exercise.description,
              duration: exercise.duration,
              date: exercise.date
            }
            return res.status(200).json({ response });
          })
          .catch((err) => {
            console.log(`controller > newExercise: ${err}`);
            return handleError(res, err);
          });
	    })
	    .catch((err) => {
	      console.log(`controller > newExercise: ${err}`);
      return handleError(res, err);
	    });
}

const handleError = (res, err) => {
  return res.status(500).json({message: err});
}

