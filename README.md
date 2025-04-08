# UBER Clone Project

This project is a simplified clone of the Uber application, built with a **Node.js** backend and a **React.js** frontend. It includes features for user and captain registration, login, profile management, ride requests, and real-time location updates using **Socket.IO**.

---

## Features

### Backend

- **User Management**:
  - Register, login, and logout for users.
  - JWT-based authentication and token blacklisting for secure logout.
- **Captain Management**:
  - Register, login, and logout for captains.
  - Vehicle details and real-time location updates.
- **Ride Management**:
  - Request and confirm rides.
  - Real-time ride updates using WebSockets.
- **Socket.IO Integration**:
  - Real-time communication for ride requests and location updates.

### Frontend

- **User Interface**:
  - User and captain login/signup pages.
  - Protected routes for user and captain dashboards.
- **Real-Time Updates**:
  - Real-time ride requests and location updates using Socket.IO.
- **Responsive Design**:
  - Mobile-first design for a seamless user experience.

---

## Tech Stack

### Backend

- **Node.js**: Server-side runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing user, captain, and ride data.
- **Socket.IO**: Real-time communication.
- **Mongoose**: MongoDB object modeling.
- **JWT**: Authentication and authorization.
- **bcrypt**: Password hashing.

### Frontend

- **React.js**: Frontend library.
- **React Router**: Client-side routing.
- **Socket.IO Client**: Real-time communication.
- **GSAP**: Animations for UI components.

---

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or on a cloud service like MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add the following:
   ```
   VITE_BASE_URL=http://localhost:3000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## Project Structure

### Backend

```
backend/
├── controllers/       # Route handlers for users, captains, and rides
├── models/            # Mongoose schemas for MongoDB collections
├── routes/            # API route definitions
├── services/          # Business logic for users, captains, and rides
├── middlewares/       # Authentication and validation middlewares
├── socket.js          # Socket.IO server setup
├── app.js             # Express app configuration
├── server.js          # Entry point for the backend server
└── db/                # MongoDB connection setup
```

### Frontend

```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/       # React Context for state management
│   ├── pages/         # Page components for routes
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point for the React app
│   └── index.css      # Global styles
└── public/            # Static assets
```

---

## API Endpoints

### User Routes

- **POST** `/users/register`: Register a new user.
- **POST** `/users/login`: Login an existing user.
- **GET** `/users/profile`: Get the logged-in user's profile.
- **GET** `/users/logout`: Logout the user and blacklist the token.

### Captain Routes

- **POST** `/captain/register`: Register a new captain.
- **POST** `/captain/login`: Login an existing captain.
- **GET** `/captain/profile`: Get the logged-in captain's profile.
- **GET** `/captain/logout`: Logout the captain and blacklist the token.

### Ride Routes

- **POST** `/rides/request`: Request a new ride.
- **POST** `/rides/confirm`: Confirm a ride by the captain.

---

## Real-Time Communication

### Events

- **join**: Sent by the client to join a room (user or captain).
- **update-location-captain**: Sent by the captain to update their location.
- **new-ride**: Sent by the server to notify captains of a new ride request.

---

## Environment Variables

### Backend

| Variable     | Description                   |
| ------------ | ----------------------------- |
| `PORT`       | Port for the backend server   |
| `MONGO_URI`  | MongoDB connection string     |
| `JWT_SECRET` | Secret key for JWT generation |

### Frontend

| Variable        | Description                     |
| --------------- | ------------------------------- |
| `VITE_BASE_URL` | Base URL for the backend server |

---

## How to Use

1. Start the backend server.
2. Start the frontend development server.
3. Open the frontend in your browser (default: `http://localhost:5173`).
4. Register as a user or captain and explore the app.

---

## Future Enhancements

- Add payment gateway integration.
- Implement ride history for users and captains.
- Add push notifications for ride updates.
- Improve UI/UX for better user experience.

---

## License

This project is licensed under the MIT License.
