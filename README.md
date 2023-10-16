# Express Todo Application

This application helps to manage your tasks.

You can add a task item, update it status and also delete a task. Task can also be sorted into pending or completed.
Your task is protected so only you can see those tasks.

**Create an account or login and start managing your tasks today. Visit [Express Todo](https://expresstodo-2h7p.onrender.com/)**

## Setting up your local environment

1. Clone this repository
2. Run **yarn** to install all packages
3. Set up your environment variables. The content of the .env file can be seen in the .env.example file.
4. Add the database name as part of the database url
5. The application uses Mongodb as the database
6. Run yarn start to start the local server
7. Run yarn test to run test files

## API Documentation

The following are routes and requirements for different endpoints of our api

### Authentication

- _POST: /api/v1/auth/signup_ => Endpoint for signing up a user. The first_name, last_name, user_name and password are required. The username is unique. The endpoint returns the created user and a jwt token

- _POST: /api/v1/auth/login_ => Endpoint for login. Requires username and password and returns a jwt token and user info

### Tasks

- _GET: /api/v1/tasks_ => Endpoint for viewing tasks. Tasks are specific to a user. It is required to pass in the jwt token in the authorization header to be able to get access to the tasks of a particaular user.
  You can also set a status query param to filter tasks by pending or completed.

- _POST: /api/v1/tasks_ => Endpoint for creating task. Authorization header is also required to create task. The name field is required

- _PATCH: /api/v1/tasks/:task_id_ => For updating task. Authorization header is also required to update task

- _DELETE: /api/v1/tasks/:task_id_ => For deleting task. Authorization header is also required to delete a task
