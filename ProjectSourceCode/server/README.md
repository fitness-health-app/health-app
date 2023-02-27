# Health APP REST API
A RESTful API Backend of an application for fitness enthusiastic customers and coach for having a healthy life.

## Installation & Run
```bash
# Clone this project
git clone https://github.com/fitness-health-app/health-app.git

# Enter into backend folder
cd ProjectSourceCode/server
```

Before running API server, you should set the database config with yours or set the your database
```bash
# Run Postgres docker instance
docker-compose up -d

# Run migrations
go run migrate/migrate.go
```

After setting up the database, we are going to run the API server. Make sure to create a copy of `example.env` file and rename as `app.env`

```bash
# Run API server
go run main.go

# API Endpoint : http://127.0.0.1:8000
```

## API

At this time, you have a RESTful API server running at `http://127.0.0.1:8000`. It provides the following endpoints:

* `GET /api/healthchecker`: a healthcheck service provided for health checking purpose if is running

### User
* `GET /api/users/me`: retrieve profile data

### Auth
* `POST /api/auth/register`: create a new user
* `POST /api/auth/update`: update a new user by user email
* `POST /api/auth/login`: returns the detailed information of an album
* `GET /api/auth/refresh`: refresh the access token
* `GET /api/auth/logout`: logout the user

### Food
* `GET /api/food/list`: list food on system `query params: limit and search`

If you are using Postman as your API testing tool then import this file [Postman Collection JSON](HealthAppBackend.postman_collection.json)
