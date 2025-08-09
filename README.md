
# # 📦 Courier and Parcel Management System - Server  (   [Live](https://book-ecommerce-backend-node.vercel.app/))

This is the **backend/server-side** implementation for the **Courier and Parcel Management System**, built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. It supports multiple user roles (Admin, Delivery Agent, Customer) with features like parcel booking, real-time location tracking, delivery status updates, and admin analytics.



## 🚀 Features

### 👤 Customer
- Register/Login
- Book a parcel (pickup & delivery address, parcel type, COD/prepaid)
- View booking history
- Track parcel in real-time on a map

### 🚚 Delivery Agent
- Login to dashboard
- View assigned parcels
- Update parcel status (Picked Up, In Transit, Delivered, Failed)
- Send real-time location updates

### 🛠️ Admin
- View dashboard analytics (bookings, COD totals, failed deliveries)
- Assign delivery agents to parcels
- View all users and parcel data
- Export reports (CSV/PDF)
## 📦 Technologies Used

- Node.js, **Express.js
- MongoDB with Mongoose
- JWT Authentication
- Role-Based Access Control (RBAC)
- Socket.IO for real-time updates
- bcrypt for password hashing
- CSV Export (Admin-only)

---

## 🔐 Authentication

- JWT-based auth
- Role-based middleware
- Passwords are hashed with bcrypt before saving

## 🔐 Environment Variables



Create a `.env` file in the root of your project and add the following environment variables:

```env
PORT=5000

# MongoDB
DATABASE_URL=your_mongodb_connection_string

# JWT Secrets
JWT_SECRET=your_jwt_secret



## Run Locally :

```
Clone the project bash Server Side  

```
   git clone https://github.com/Alamin9462/courier-parcel-server
```
Go to the project directory

```bash
  cd project-file
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```
Start the client

```bash
  npm run dev (Pending) Client side 
```



## Deployment

This project is deployed on Vercel:

CI/CD is enabled via GitHub.
Automatic deployment on main branch push.

## 🔄 API Endpoints

### 📦 Parcel Routes (`/api/parcel`)

| Method | Endpoint                            | Description                                |
|--------|-------------------------------------|--------------------------------------------|
| POST   | `/api/parcel`                       | Book a new parcel (Customer only)          |
| GET    | `/api/parcel`                       | Get all parcels (Admin only)               |
| GET    | `/api/parcel/my-parcels`            | Get logged-in customer's parcels           |
| GET    | `/api/parcel/:id`                   | Get parcel by ID (Authenticated)           |
| PUT    | `/api/parcel/:id`                   | Update parcel info (Admin only)            |
| PUT    | `/api/parcel/:id/status`            | Update parcel status (Delivery agent only) |
| PUT    | `/api/parcel/:id/location`          | Update live location (Delivery agent only) |
| GET    | `/api/parcel/:id/location`          | Get live parcel location (Customer only)   |
| DELETE | `/api/parcel/:id`                   | Delete parcel (Admin only)                 |
| GET    | `/api/parcel/metrics/dashboard`     | Admin dashboard metrics                    |
| GET    | `/api/parcel/export/csv`            | Export all parcels to CSV (Admin only)     |

---

### 👥 User Routes (`/api/user`)

| Method | Endpoint                        | Description                              |
|--------|----------------------------------|------------------------------------------|
| POST   | `/api/user/create-user`         | Create a user (Admin or system only)     |
| GET    | `/api/user`                     | Get all users (Admin only)               |
| GET    | `/api/user/:id`                 | Get user by ID                           |
| PUT    | `/api/user/:id`                 | Update user info (Admin only)            |
| DELETE | `/api/user/:id`                 | Deactivate user (Admin only)             |
| POST   | `/api/user/assign-parcels`      | Assign parcels to agent (Admin only)     |

---

### 🔐 Auth Routes (`/api/auth`)

| Method | Endpoint               | Description             |
|--------|------------------------|-------------------------|
| POST   | `/api/auth/register`   | Register new user       |
| POST   | `/api/auth/login`      | Login existing user     |
| POST   | `/api/auth/logout`     | Logout and clear token  |

📬 Postman Collection: _Coming soon...



### 📁 Folder Structure
src/

├── controllers

├── routes

├── models

├── middlewares

├── services

├── utils

├── app.ts

└── server.ts


## Authors
 Md Alamin
🎓 CSE Student |  Full Stack Stack Developer 
- [🔗LinkedIn](https://www.linkedin.com/in/alamin9462/)


## Support

For support, email alaminmd9462@gmail.com or join my discord alamin9462 channel.






