# Library Management API

A RESTful Library Management System built using Express.js, TypeScript, Prisma ORM, and PostgreSQL.

## Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Refresh Token Support

### Authorization

* Role-Based Access Control (RBAC)
* Roles:

  * ADMIN
  * LIBRARIAN
  * STUDENT

### Book Management

* Create Book
* Get All Books
* Get Book By ID
* Update Book
* Delete Book

### Security

* Protected Routes using Middleware
* JWT Token Verification
* Refresh Token Mechanism
* Password Hashing with bcrypt

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* JWT (JSON Web Token)
* bcrypt

## Project Structure

```text
src
├── config
│   └── prisma.ts
├── middleware
│   ├── auth.middleware.ts
│   └── role.middleware.ts
├── modules
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   └── auth.service.ts
│   └── book
│       ├── book.controller.ts
│       ├── book.routes.ts
│       └── book.service.ts
├── routes
│   └── index.ts
├── app.ts
└── server.ts
```

## API Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

#### Login User

```http
POST /auth/login
```

#### Refresh Access Token

```http
POST /auth/refresh-token
```

### Books

#### Get All Books

```http
GET /books
```

#### Get Book By ID

```http
GET /books/:id
```

#### Create Book

```http
POST /books
```

#### Update Book

```http
PUT /books/:id
```

#### Delete Book

```http
DELETE /books/:id
```

## Role Permissions

| Feature        | ADMIN | LIBRARIAN | STUDENT |
| -------------- | ----- | --------- | ------- |
| View Books     | ✅     | ✅         | ✅       |
| Get Book By ID | ✅     | ✅         | ✅       |
| Add Book       | ✅     | ✅         | ❌       |
| Update Book    | ✅     | ✅         | ❌       |
| Delete Book    | ✅     | ❌         | ❌       |

## Installation

```bash
git clone <repository-url>
cd library-management-api
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

## Database Migration

```bash
npx prisma migrate dev
npx prisma generate
```

## Seed Database

```bash
npm run seed
```

## Run Application

```bash
npm run dev
```

Server will run on:

```text
http://localhost:5000
```

## Future Enhancements

* Borrow Book
* Return Book
* Book Availability Tracking
* Transaction History
* Swagger API Documentation
* Refresh Token Persistence
* Fine Management System

## Author

Devaharshini
