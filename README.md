# Health APP REST API
A RESTful API Backend of an application for fitness enthusiastic customers and coach for having a healthy life.

## Installation & Run
```bash
# Clone this project
git clone https://github.com/fitness-health-app/health-app-backend.git
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

* `GET /healthcheck`: a healthcheck service provided for health checking purpose if is running

* `GET /api/users/me`: retrieve profile data
* `POST /api/auth/register`: create a new user
* `POST /api/auth/login`: returns the detailed information of an album
* `GET /api/auth/refresh`: refresh the access token
* `GET /api/auth/logout`: logout the user
