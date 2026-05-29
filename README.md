# Backend & Discord Bot Integration

A production-grade backend application built with **Node.js**, **Express.js**, **MySQL**, and **Sequelize ORM**, featuring **JWT Authentication** and seamless **Discord API** integration via slash commands to interact with the database directly from Discord.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **ORM:** Sequelize
* **Authentication:** JWT (JSON Web Tokens), bcrypt (Password Hashing), cookie-parser
* **Bot Integration:** Discord.js (v14)
* **Environment Management:** dotenv

---

## 🚀 Features

### 1. Authentication & Security (REST APIs)
* **Secure Signup:** Password hashing using `bcrypt` with duplicate email validation.
* **Secure Login:** Credential verification returning a stateful JWT Token set in both cookies and response body.
* **Route Protection:** Standard production practices for environment variables and error handling.

### 2. Discord Bot Integration
Full interaction with the MySQL database using Discord Slash Commands:
* `/ppcreateuser`: Registers a new user directly into the database by making an internal POST request to the Signup API.
* `/ppgetuser`: Fetches a user's details from the database by email via a GET request.
* `/ppcreateservice`: Creates a new service offering inside the MySQL database via a POST request.

---

## 📁 Project Directory Structure

```text
├── src/
│   ├── authcontroller/
│   │   └── auth.controller.js
│   ├── bot/
│   │   └── bot.js
│   ├── db/
│   │   └── db.js
│   ├── models/
│   │   ├── user.models.js
│   │   └── service.models.js
│   ├── routes/
│   │   └── auth.routes.js
│   └── app.js
├── .env
├── server.js
├── package.json
└── README.md