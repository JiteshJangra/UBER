# API Documentation

## Endpoint: `/users/register`

### Description

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Method

`POST`

### Request Body

The request body should be a JSON object containing the following fields:

- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

## Endpoint: `/users/login`

### Description

This endpoint is used to log in an existing user. It requires the user's email and password.

### Method

`POST`

### Request Body

The request body should be a JSON object containing the following fields:

- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Failure

- **Status Code:** `400 Bad Request`
- **Response Body:**

  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Invalid email/password"
  }
  ```

## Endpoint: `/users/profile`

### Description

This endpoint is used to get the profile of the logged-in user. It requires a valid JWT token.

### Method

`GET`

### Headers

- `Authorization` (string, required): The JWT token of the logged-in user.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "_id": "user_id_here",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

#### Failure

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Endpoint: `/users/logout`

### Description

Logout the current user and blacklist the token provided in the cookie or headers.

### Method

`GET`

### Headers

- `Authorization` (string, required): The JWT token of the logged-in user or cookie.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Logged Out"
  }
  ```

#### Failure

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Endpoint: `/captain/register`

### Description

This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.

### Method

`POST`

### Request Body

The request body should be a JSON object containing the following fields:

- `fullname.firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.
- `vehicle.color` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number, required): The capacity of the vehicle. Must be at least 1.
- `vehicle.vehicleType` (string, required): The type of the vehicle. Must be one of "car", "motorcycle", or "auto".

Example:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses

#### Success

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

#### Failure

- **Status Code:** `400 Bad Request`
- **Response Body:**

  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "first name must be atleast 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      },
      {
        "msg": "Color must be atleast 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Plate must be atleast 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Capacity must be atleast 1",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "Invalid Vehicle type",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```
