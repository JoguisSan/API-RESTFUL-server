// server.ts - RESTful API with Node.js and TypeScript
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface ErrorResponse {
  error: string;
  message: string;
  status: number;
}

// Simulated database (in production, use MongoDB, PostgreSQL, etc.)
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', createdAt: new Date() },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date() }
];

let products: Product[] = [
  { id: '1', name: 'Laptop', price: 3500, category: 'Electronics', stock: 10 },
  { id: '2', name: 'Gaming Mouse', price: 150, category: 'Peripherals', stock: 50 },
  { id: '3', name: 'Mechanical Keyboard', price: 400, category: 'Peripherals', stock: 30 }
];

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // Security
app.use(cors()); // CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============= USER ROUTES =============

// GET - List all users
app.get('/api/users', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET - Get user by ID
app.get('/api/users/:id', (req: Request, res: Response, next: NextFunction) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  res.json({
    success: true,
    data: user
  });
});

// POST - Create new user
app.post('/api/users', (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return next(new AppError('Name and email are required', 400));
  }
  
  const newUser: User = {
    id: String(users.length + 1),
    name,
    email,
    createdAt: new Date()
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// PUT - Update user
app.put('/api/users/:id', (req: Request, res: Response, next: NextFunction) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  
  if (userIndex === -1) {
    return next(new AppError('User not found', 404));
  }
  
  const { name, email } = req.body;
  
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email
  };
  
  res.json({
    success: true,
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// DELETE - Delete user
app.delete('/api/users/:id', (req: Request, res: Response, next: NextFunction) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  
  if (userIndex === -1) {
    return next(new AppError('User not found', 404));
  }
  
  users.splice(userIndex, 1);
  
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// ============= PRODUCT ROUTES =============

// GET - List all products
app.get('/api/products', (req: Request, res: Response) => {
  const { category, minPrice, maxPrice } = req.query;
  
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === String(category).toLowerCase()
    );
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
  }
  
  res.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  });
});

// GET - Get product by ID
app.get('/api/products/:id', (req: Request, res: Response, next: NextFunction) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return next(new AppError('Product not found', 404));
  }
  
  res.json({
    success: true,
    data: product
  });
});

// POST - Create new product
app.post('/api/products', (req: Request, res: Response, next: NextFunction) => {
  const { name, price, category, stock } = req.body;
  
  if (!name || !price || !category || stock === undefined) {
    return next(new AppError('All fields are required', 400));
  }
  
  const newProduct: Product = {
    id: String(products.length + 1),
    name,
    price: Number(price),
    category,
    stock: Number(stock)
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
});

// PUT - Update product
app.put('/api/products/:id', (req: Request, res: Response, next: NextFunction) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return next(new AppError('Product not found', 404));
  }
  
  const { name, price, category, stock } = req.body;
  
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price !== undefined ? Number(price) : products[productIndex].price,
    category: category || products[productIndex].category,
    stock: stock !== undefined ? Number(stock) : products[productIndex].stock
  };
  
  res.json({
    success: true,
    message: 'Product updated successfully',
    data: products[productIndex]
  });
});

// DELETE - Delete product
app.delete('/api/products/:id', (req: Request, res: Response, next: NextFunction) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return next(new AppError('Product not found', 404));
  }
  
  products.splice(productIndex, 1);
  
  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// ============= GENERAL ROUTES =============

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'RESTful API with Node.js + TypeScript',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products'
    }
  });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 route
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    status: statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Documentation: http://localhost:${PORT}/`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

export default app;
