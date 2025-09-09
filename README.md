🔐 MERN Authentication App

A secure and scalable Authentication System built with the MERN stack (MongoDB, Express, React, Node.js).
It provides a robust way to manage user accounts with modern features like JWT-based authentication, password reset via email, and OTP verification.

✨ Features
👤 User Management

User Registration & Login

Password Hashing with bcrypt for enhanced security

JWT-based Authentication for session management

🔑 Password Reset

Forgot Password workflow:

User requests reset

Receives secure token via email

Resets password through link

📧 Email + OTP

OTP (One-Time Password) verification via email for account confirmation

Secure verification tokens stored in DB

🎨 Frontend

Built with React

Optimized with:

React.lazy + Suspense for code-splitting

useReducer for form state management (better than multiple useState)

🛠️ Developer Tools

Environment variable management with dotenv

API testing with Postman

Modular file structure for scalability

🛠️ Tech Stack

Frontend: React, React Router, TailwindCSS (optional)

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT, bcrypt

Email/OTP: Resend
 (email service provider)

Testing/Tools: Postman, dotenv
