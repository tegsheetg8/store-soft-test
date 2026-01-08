# POS (Point of Sale) System

A full-featured web-based POS system for retail stores built with NestJS (backend) and Angular (frontend).

## Features

### 🔐 Authentication & Users

- JWT-based authentication
- Role-based access control (Admin, Cashier)
- User management (Admin only)

### 📦 Product Management

- Product CRUD operations
- Product categories
- Units of measurement
- Barcode support
- Purchase price & selling price
- Minimum stock alerts

### 🏢 Supplier Management

- Supplier registration and management
- Supplier information (name, phone, email, address)

### 📥 Stock Management

- **Stock In**: Register stock income from suppliers
- **Stock Out**: Manual stock out (damaged, expired, adjustment)
- **Stock Taking**: Inventory count and adjustment

### 💰 Sales (POS)

- Fast POS screen
- Search products by name or barcode
- Add/remove items to cart
- Quantity adjustment
- Auto calculate total
- Payment processing (cash)
- Automatic stock decrease

### 🧾 Receipt Printing

- Generate printable receipts (HTML/ESC-POS ready)
- Receipt includes store name, date/time, items, totals

### 📊 Reports

- Sales report by date range
- Stock balance report
- Low stock report

## Tech Stack

### Backend

- **NestJS** (TypeScript)
- **PostgreSQL** database
- **TypeORM** for database operations
- **JWT** for authentication
- **bcrypt** for password hashing
- **class-validator** for DTO validation

### Frontend

- **Angular 17** (TypeScript)
- **Angular Material** for UI components
- **RxJS** for reactive programming
- **HTTP Client** for API communication

## Project Structure

```
store-soft-test/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── user/           # User management
│   │   ├── category/       # Product categories
│   │   ├── unit/           # Units of measurement
│   │   ├── product/        # Products
│   │   ├── supplier/       # Suppliers
│   │   ├── stock/          # Stock management
│   │   ├── sale/           # Sales & POS
│   │   ├── report/        # Reports
│   │   ├── entities/      # Database entities
│   │   └── common/        # Shared utilities
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/               # Angular frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/ # Angular components
    │   │   ├── services/   # API services
    │   │   ├── guards/     # Route guards
    │   │   └── interceptors/# HTTP interceptors
    ├── package.json
    └── angular.json
```

## Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

## Installation & Setup

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE pos_db;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env file with your database credentials
# PGHOST=localhost
# PGPORT=5432
# PGUSER=postgres
# PGPASSWORD=your_password
# PGDATABASE=pos_db
# JWT_SECRET=your-secret-key-change-in-production
# JWT_EXPIRES_IN=24h
# PORT=3000

# Run database seed (creates admin and cashier users)
npm run seed

# Start backend server
npm run start:dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will run on `http://localhost:4200`

## Default Login Credentials

After running the seed script, you can login with:

- **Admin**:

  - Username: `admin`
  - Password: `admin123`

- **Cashier**:
  - Username: `cashier`
  - Password: `cashier123`

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `GET /auth/profile` - Get current user profile

### Users (Admin only)

- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Categories

- `GET /categories` - List all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Units

- `GET /units` - List all units
- `GET /units/:id` - Get unit by ID
- `POST /units` - Create unit
- `PATCH /units/:id` - Update unit
- `DELETE /units/:id` - Delete unit

### Products

- `GET /products` - List all products
- `GET /products?search=query` - Search products
- `GET /products/barcode/:barcode` - Get product by barcode
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Suppliers

- `GET /suppliers` - List all suppliers
- `GET /suppliers/:id` - Get supplier by ID
- `POST /suppliers` - Create supplier
- `PATCH /suppliers/:id` - Update supplier
- `DELETE /suppliers/:id` - Delete supplier

### Stock

- `POST /stock/in` - Create stock in
- `GET /stock/in` - List all stock ins
- `GET /stock/in/:id` - Get stock in by ID
- `POST /stock/out` - Create stock out
- `GET /stock/out` - List all stock outs
- `GET /stock/out/:id` - Get stock out by ID
- `POST /stock/taking` - Create stock taking
- `GET /stock/taking` - List all stock takings
- `GET /stock/taking/:id` - Get stock taking by ID

### Sales

- `POST /sales` - Create sale
- `GET /sales` - List all sales
- `GET /sales?startDate=...&endDate=...` - Get sales by date range
- `GET /sales/:id` - Get sale by ID
- `GET /sales/:id/receipt` - Get receipt HTML

### Reports

- `GET /reports/sales?startDate=...&endDate=...` - Sales report
- `GET /reports/stock-balance` - Stock balance report
- `GET /reports/low-stock` - Low stock report

## Database Schema

### Entities

- **User**: id, username, password, role, isActive, createdAt
- **ProductCategory**: id, name, description
- **Unit**: id, name, shortName
- **Product**: id, name, barcode, categoryId, unitId, purchasePrice, salePrice, stock, minStock
- **Supplier**: id, name, phone, email, address
- **StockIn**: id, supplierId, totalAmount, createdAt
- **StockInItem**: id, stockInId, productId, quantity, price
- **StockOut**: id, reason, createdAt
- **StockOutItem**: id, stockOutId, productId, quantity
- **Sale**: id, userId, totalAmount, paidAmount, changeAmount, createdAt
- **SaleItem**: id, saleId, productId, quantity, price
- **StockTaking**: id, note, createdAt
- **StockTakingItem**: id, stockTakingId, productId, systemQty, realQty

## Sample POS Sale Flow

1. User logs in (Cashier or Admin)
2. Navigate to POS screen
3. Search for products by name or scan barcode
4. Add products to cart
5. Adjust quantities as needed
6. Enter paid amount
7. System calculates change automatically
8. Click "Complete Sale"
9. Stock is automatically decreased
10. Receipt is generated and can be printed

## Receipt Template

Receipts are generated in HTML format and include:

- Store name
- Date and time
- Receipt number
- Cashier name
- List of items with quantities and prices
- Subtotal
- Paid amount
- Change amount

## Development

### Backend Development

```bash
cd backend
npm run start:dev  # Watch mode
npm run build      # Build for production
npm run start:prod # Run production build
```

### Frontend Development

```bash
cd frontend
npm start          # Development server
npm run build      # Build for production
```

## Production Deployment

1. Build both backend and frontend
2. Set up PostgreSQL database
3. Configure environment variables
4. Run database migrations
5. Deploy backend to server
6. Deploy frontend to web server (nginx, Apache, etc.)
7. Configure CORS and API endpoints

## Security Notes

- Change default JWT_SECRET in production
- Use strong passwords
- Enable HTTPS in production
- Regularly update dependencies
- Implement rate limiting
- Add input sanitization
- Use environment variables for sensitive data

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
