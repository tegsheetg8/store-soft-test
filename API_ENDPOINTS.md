# API Endpoints Documentation

Base URL: `http://localhost:3000`

All endpoints (except `/auth/login`) require JWT authentication via Bearer token in the Authorization header.

## Authentication

### POST /auth/login
Login and get JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "ADMIN"
  }
}
```

### GET /auth/profile
Get current user profile (requires authentication).

---

## Users (Admin Only)

### GET /users
List all users.

### GET /users/:id
Get user by ID.

### POST /users
Create new user.

**Request Body:**
```json
{
  "username": "newuser",
  "password": "password123",
  "role": "CASHIER",
  "isActive": true
}
```

### PATCH /users/:id
Update user.

**Request Body:**
```json
{
  "username": "updateduser",
  "password": "newpassword123",  // Optional
  "role": "ADMIN",
  "isActive": true
}
```

### DELETE /users/:id
Delete user.

---

## Categories

### GET /categories
List all product categories.

### GET /categories/:id
Get category by ID.

### POST /categories
Create category.

**Request Body:**
```json
{
  "name": "Electronics",
  "description": "Electronic products"
}
```

### PATCH /categories/:id
Update category.

### DELETE /categories/:id
Delete category.

---

## Units

### GET /units
List all units of measurement.

### GET /units/:id
Get unit by ID.

### POST /units
Create unit.

**Request Body:**
```json
{
  "name": "Piece",
  "shortName": "pcs"
}
```

### PATCH /units/:id
Update unit.

### DELETE /units/:id
Delete unit.

---

## Products

### GET /products
List all products.

### GET /products?search=query
Search products by name or barcode.

### GET /products/barcode/:barcode
Get product by barcode.

### GET /products/:id
Get product by ID.

### POST /products
Create product.

**Request Body:**
```json
{
  "name": "Product Name",
  "barcode": "123456789",
  "categoryId": 1,
  "unitId": 1,
  "purchasePrice": 10.00,
  "salePrice": 15.00,
  "minStock": 5
}
```

### PATCH /products/:id
Update product.

### DELETE /products/:id
Delete product.

---

## Suppliers

### GET /suppliers
List all suppliers.

### GET /suppliers/:id
Get supplier by ID.

### POST /suppliers
Create supplier.

**Request Body:**
```json
{
  "name": "Supplier Name",
  "phone": "123-456-7890",
  "email": "supplier@example.com",
  "address": "123 Main St"
}
```

### PATCH /suppliers/:id
Update supplier.

### DELETE /suppliers/:id
Delete supplier.

---

## Stock In

### POST /stock/in
Create stock in (purchase invoice).

**Request Body:**
```json
{
  "supplierId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 10,
      "price": 10.00
    }
  ]
}
```

### GET /stock/in
List all stock ins.

### GET /stock/in/:id
Get stock in by ID.

---

## Stock Out

### POST /stock/out
Create stock out.

**Request Body:**
```json
{
  "reason": "Damaged goods",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

### GET /stock/out
List all stock outs.

### GET /stock/out/:id
Get stock out by ID.

---

## Stock Taking

### POST /stock/taking
Create stock taking (inventory count).

**Request Body:**
```json
{
  "note": "Monthly inventory count",
  "items": [
    {
      "productId": 1,
      "realQty": 50
    }
  ]
}
```

### GET /stock/taking
List all stock takings.

### GET /stock/taking/:id
Get stock taking by ID.

---

## Sales

### POST /sales
Create sale (POS transaction).

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 15.00
    }
  ],
  "paidAmount": 30.00
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "totalAmount": 30.00,
  "paidAmount": 30.00,
  "changeAmount": 0.00,
  "createdAt": "2024-01-01T10:00:00Z",
  "items": [...]
}
```

### GET /sales
List all sales.

### GET /sales?startDate=2024-01-01&endDate=2024-01-31
Get sales by date range.

### GET /sales/:id
Get sale by ID.

### GET /sales/:id/receipt
Get receipt HTML (for printing).

---

## Reports

### GET /reports/sales?startDate=2024-01-01&endDate=2024-01-31
Get sales report.

**Response:**
```json
{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "totalSales": 5000.00,
  "totalTransactions": 150,
  "sales": [...]
}
```

### GET /reports/stock-balance
Get stock balance report.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "category": "Electronics",
    "unit": "pcs",
    "stock": 50,
    "minStock": 10,
    "status": "OK"
  }
]
```

### GET /reports/low-stock
Get low stock report (products with stock <= 0).

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "timestamp": "2024-01-01T10:00:00Z",
  "path": "/api/endpoint"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

