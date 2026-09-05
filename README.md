# Blogging Platform API
> Project URL: https://roadmap.sh/projects/blogging-platform-api
A RESTful API for a personal blogging platform built with Node.js and Express, supporting full CRUD operations, query search, and input validation.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Search Capability**: Filter posts by query term across titles, contents, and categories (`/posts?term=keyword`).
- **Input Validation**: Robust error handling and input validation with appropriate HTTP status codes (400, 404, 500).
- **RESTful Design**: Clean and predictable endpoint structure.

## 🛠️ Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Dependencies**: Cors, Dotenv

## 📌 API Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/posts` | Create a new blog post | `201 Created` |
| `GET` | `/posts` | Get all posts or search via query (`?term=...`) | `200 OK` |
| `GET` | `/posts/:id` | Get a specific post by ID | `200 OK` / `404 Not Found` |
| `PUT` | `/posts/:id` | Update an existing post by ID | `200 OK` / `400 Bad Request` |
| `DELETE` | `/posts/:id` | Delete a post by ID | `204 No Content` / `404 Not Found` |

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/MTrung94/Blogging-Platform-API.git](https://github.com/MTrung94/Blogging-Platform-API.git)
   cd Blogging-Platform-API
