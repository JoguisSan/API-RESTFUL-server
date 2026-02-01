# API-RESTFUL-server with Node.js + TypeScript

![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey?logo=express)
![License](https://img.shields.io/badge/License-MIT-yellow)

## About The Project

Complete and professional RESTful API developed with Node.js, Express, and TypeScript, following industry best practices and standards.

## Features

- **TypeScript** - Static typing for enhanced safety
- **Express** - Minimalist and robust web framework
- **Complete CRUD** - Create, Read, Update, Delete operations
- **Data Validation** - Input data validation
- **Error Handling** - Centralized error handling
- **Security** - Helmet for security headers
- **CORS** - Cross-Origin Resource Sharing configuration
- **Logging** - Morgan for request logging
- **Query Params** - Filters and pagination
- **Status Codes** - Appropriate HTTP status codes
- **Health Check** - Endpoint for monitoring

## Technologies Used

- **Node.js** - JavaScript runtime
- **TypeScript** - JavaScript superset with typing
- **Express** - Web framework for Node.js
- **Helmet** - Security with HTTP headers
- **CORS** - Cross-origin access control
- **Morgan** - HTTP request logger

## Project Structure

```
api-restful-nodejs/
│
├── src/
│   └── server.ts          # Main server
├── dist/                  # Compiled build
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md            # Documentation
```

## How to Run

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/api-restful-nodejs.git
cd api-restful-nodejs
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev
```

4. Or compile and run in production:
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

##  API Endpoints

###  General Routes

#### GET /
API information
```bash
curl http://localhost:3000/
```

#### GET /health
Server health check
```bash
curl http://localhost:3000/health
```

###  User Routes

#### GET /api/users
List all users
```bash
curl http://localhost:3000/api/users
```

#### GET /api/users/:id
Get user by ID
```bash
curl http://localhost:3000/api/users/1
```

#### POST /api/users
Create new user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

#### PUT /api/users/:id
Update existing user
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe Updated"}'
```

#### DELETE /api/users/:id
Delete user
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Product Routes

#### GET /api/products
List all products (with optional filters)
```bash
# All products
curl http://localhost:3000/api/products

# Filter by category
curl http://localhost:3000/api/products?category=Electronics

# Filter by price range
curl http://localhost:3000/api/products?minPrice=100&maxPrice=500
```

#### GET /api/products/:id
Get product by ID
```bash
curl http://localhost:3000/api/products/1
```

#### POST /api/products
Create new product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "price": 3500, "category": "Electronics", "stock": 10}'
```

#### PUT /api/products/:id
Update existing product
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 3200, "stock": 15}'
```

#### DELETE /api/products/:id
Delete product
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

## Response Examples

### Success (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error (404 Not Found)
```json
{
  "success": false,
  "error": "User not found",
  "status": 404
}
```

### Validation Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Name and email are required",
  "status": 400
}
```

## Available Scripts

- `npm run dev` - Start in development mode with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start in production mode
- `npm test` - Run tests
- `npm run lint` - Check code with ESLint
- `npm run format` - Format code with Prettier

## Security

The API implements multiple security layers:

- **Helmet** - Configures secure HTTP headers
- **CORS** - Controls access from different origins
- **Validation** - Validates all input data
- **Error Handling** - Doesn't expose sensitive information

## Next Steps

- [ ] Add JWT authentication
- [ ] Implement rate limiting
- [ ] Connect to database (MongoDB/PostgreSQL)
- [ ] Add unit and integration tests
- [ ] Implement pagination
- [ ] Add Swagger/OpenAPI documentation
- [ ] Implement Redis cache
- [ ] Add CI/CD

## Contributing

Contributions are always welcome!

1. Fork the project
2. Create a branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

This project is under the MIT license.

## Author

Developed with care by Jagne Santiago.

---

⭐ If this project helped you, leave a star!
