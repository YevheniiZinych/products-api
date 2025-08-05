# Orders & Products Backend API

This is a simple backend API built with NestJS and sequelize-typescript for managing Orders and Products.

## Features

- Create new orders with multiple products in one request
- Fetch all orders with their products
- Fetch all products
- Delete a single order (with all its products)
- Delete a single product

## Getting Started (Local Setup)

1. **Clone the repository**

- git clone [https://github.com/your-username/orders-products-backend.git](https://github.com/YevheniiZinych/products-api.git)

2. **Install dependencies**

- npm install

3.  **Set up your local PostgreSQL database**

- Create a new database (e.g. `products`)

4. **Create a `.env` file in the root of your project:**
   - POSTGRES_HOST=localhost
   - POSTGRES_PORT=5432
   - POSTGRES_USER=postgres
   - POSTGRES_PASSWORD=yourpassword
   - POSTGRES_DB=products

5. **Run database migrations (if needed)**  
   _(This project uses `autoLoadModels: true` and `synchronize: true` by default, so tables will be created automatically on start.)_

6. **Start the server**
   - npm run start:dev

The API will be available at [http://localhost:3000](http://localhost:3000).

## Available Endpoints

- GET (`/orders`) - Get all orders with their products
- POST (`/orders` ) - Create a new order with products
- DELETE (`/orders/:id`) - Delete an order and all its products
- GET (`/products` ) - Get all products
- DELETE (`/products/:id` ) - Delete a single product

### Example: Create Order (POST `/orders`)

```json
{
  "title": "Order 123",
  "date": "2025-08-04T18:40:00Z",
  "description": "Test order for new shipment",
  "products": [
    {
      "serialNumber": 123456,
      "isNew": 1,
      "photo": "monitor.jpg",
      "title": "Dell Monitor",
      "type": "Monitors",
      "specification": "IPS, 27 inches, 2K",
      "guarantee": {
        "start": "2025-08-04T18:40:00Z",
        "end": "2026-08-04T18:40:00Z"
      },
      "price": [
        { "value": 250, "symbol": "USD", "isDefault": false },
        { "value": 9900, "symbol": "UAH", "isDefault": true }
      ],
      "date": "2025-08-04T18:40:00Z"
    }
  ]
}
```
