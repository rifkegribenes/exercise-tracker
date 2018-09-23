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
        return res.status(200).json({
            message: 'User saved successfully',
            user
          });
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
    	return res.status(200).json({users});
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
  console.log(`book.ctrl.js > getUserLog: ${req.params}`);
  Exercise.find({ userId: req.params.userId })
    .then((exercises) => {
      let data = [ ...exercises ];
      if (req.params.to) {
        data = data.filter(exercise => exercise.date <= req.params.to);
      }
      if (req.params.from) {
        data = data.filter(exercise => exercise.date >= req.params.from);
      }
      if (req.params.limit) {
        data = data.slice(0, (limit + 1));
      }
      return res.status(200).json({exercises: data});
    })
    .catch((err) => {
      console.log(`controller > getUserLog: ${err}`);
      return handleError(res, err);
    });
};

exports.newExercise = (req, res, next) => {
  const exercise = req.body;
  console.log(exercise);

    const today = new Date();
    if (!exercise.date) exercise.date = today;
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
	      return res.status(200).json({
	          message: 'Exercise saved successfully',
	          exercise
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

