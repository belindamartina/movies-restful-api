#  Movie Auth API

A secure RESTful API built with Node.js and Express, featuring JWT-based authentication and a cloud-hosted MongoDB Atlas database.

##  Live Demo

**API Endpoint:** [https://movies-restful-q9ismtu4d-belinda-martinas-projects.vercel.app/](https://movies-restful-q9ismtu4d-belinda-martinas-projects.vercel.app/)

---

##  Features

- **User Authentication:** Secure Registration and Login using hashed passwords.
- **JWT Security:** Protected routes using JSON Web Tokens (Bearer Token).
- **Cloud Database:** Fully integrated with MongoDB Atlas.
- **Automated Deployment:** CI/CD pipeline via GitHub to Vercel.
- **Documentation:** Built-in HTML documentation for easy testing.

##  Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **Auth:** JSON Web Tokens (JWT) & Bcrypt
- **Hosting:** Vercel

##  API Endpoints

###  Authentication

| Method | Endpoint         | Description         | Request Body (JSON)                | Auth Required |
| :----- | :--------------- | :------------------ | :--------------------------------- | :-----------: |
| `POST` | `/auth/register` | Register a new user | `{"username": "", "password": ""}` |      ❌       |
| `POST` | `/auth/login`    | Login & get JWT     | `{"username": "", "password": ""}` |      ❌       |

###  Movies

| Method   | Endpoint      | Description    | Headers                         | Auth Required |
| :------- | :------------ | :------------- | :------------------------------ | :-----------: |
| `GET`    | `/movies`     | Get all movies | `Authorization: Bearer <token>` |      ✅       |
| `POST`   | `/movies`     | Add a movie    | `Authorization: Bearer <token>` |      ✅       |
| `GET`    | `/movies/:id` | Get one movie  | `Authorization: Bearer <token>` |      ✅       |
| `DELETE` | `/movies/:id` | Delete a movie | `Authorization: Bearer <token>` |      ✅       |
