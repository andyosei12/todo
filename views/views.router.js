const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userServices = require('../users/users.services');
const taskServices = require('../tasks/tasks.services');

const router = express.Router();

router.use(cookieParser());

router.get('/user/login', (req, res) => {
  res.render('login', { error: null, pageTitle: 'Todo | Login' });
});

router.post('/user/login', async (req, res) => {
  const response = await userServices.loginUser(req.body);
  if (response.error) {
    return res.render('login', {
      error: response.message,
      pageTitle: 'Todo | Login',
    });
  } else {
    res.cookie('jwt', response.data.token);
    res.redirect('/');
  }
});

router.get('/user/signup', (req, res) => {
  res.render('signup', { error: null, pageTitle: 'Todo | Create an account' });
});

router.post('/user/signup', async (req, res) => {
  const response = await userServices.registerUser(req.body);
  if (response.error) {
    return res.render('signup', {
      error: response.message,
      pageTitle: 'Todo | Create an account',
    });
  } else {
    res.cookie('jwt', response.data.token);
    res.redirect('/');
  }
});

router.use(async (req, res, next) => {
  if (req.cookies) {
    try {
      const decodedValue = await jwt.verify(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      res.locals.user = decodedValue;
      next();
    } catch (error) {
      res.redirect('/user/login');
    }
  } else {
    res.redirect('/user/login');
  }
});

router.get('/', async (req, res) => {
  const userId = res.locals.user.id;
  const response = await taskServices.getTasks(userId);
  res.render('index', {
    user: res.locals.user,
    error: null,
    tasks: response.tasks,
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/user/login');
});

// Add a task
router.post('/task', async (req, res) => {
  const response = await taskServices.addTask(req.body);
  if (response.error) {
    return res.redirect('/', { error: response.message });
  } else {
    res.redirect('/');
  }
});

// Get tasks
router.get('/tasks', async (req, res) => {
  const userId = res.locals.user.id;
  const { status } = req.query;
  const response = await taskServices.getTasks(userId, status);
  if (response.error) {
    return res.redirect('/', { error: response.message });
  } else {
    res.render('index', {
      user: res.locals.user,
      error: null,
      tasks: response.tasks,
    });
  }
});

// Update task
router.post('/task/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const response = await taskServices.updateTask(taskId);
  if (response.error) {
    return res.redirect('/', { error: response.message });
  } else {
    res.redirect('/');
  }
});

// Delete task
router.post('/task/:taskId/remove', async (req, res) => {
  const { taskId } = req.params;
  console.log(taskId);
  const response = await taskServices.deleteTask(taskId);
  if (response.error) {
    return res.redirect('/', { error: response.message });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
