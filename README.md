# E-Commerce Application

A comprehensive full-stack e-commerce application showcasing the integration of a **Spring Boot** backend with a **React** frontend. The project demonstrates RESTful API implementation and interaction, focusing on a clean, scalable architecture and a responsive user interface.

<!-- ## Application Demo

### GIF Demo
![Demo GIF](./demo/demo.gif)

### Screenshots

#### Home Page
![Home Page](./demo/home-page.png)

#### Product Details Page
![Product Details](./demo/product-details.png)

#### Cart Page
![Cart Page](./demo/cart-page.png)

#### Order Confirmation Page
![Order Confirmation](./demo/order-confirmation.png) -->


## Key Features

- **User Authentication and Authorization**
  - Secure, JWT-based authentication.
  - Role-based access control for users and admins.
  
- **Product Management**
  - Dynamic product retrieval from the backend with pagination.
  - Detailed product views with "Add to Cart" functionality.

- **Shopping Cart and Checkout**
  - Persistent cart state using local storage.
  - Order creation and management with mock transaction verification.

- **Order Management**
  - User-specific order history.
  - Plans for admin-specific features in future iterations.

---

## Backend Overview

The backend is built with **Spring Boot**, offering a robust and secure REST API for e-commerce functionalities.

### Technologies & Techniques

- **Spring Boot**: Foundation of the RESTful API.
- **Spring Security**: Handles JWT authentication and role-based authorization.
- **Spring Data JPA**: Simplifies database operations with repositories.
- **H2 Database**: Used for development; adaptable to MySQL for production.
- **Data Transfer Objects (DTOs)**: Ensures clean API responses.
- **Mock Transaction Verification**: Simulates real-world payment processes.
- **Error Handling**: Centralized exception management using `@ControllerAdvice`.
- **Unit Testing**: Ensures reliability of business logic.

### Key Endpoints

| Endpoint                     | Description                          |
|-------------------------------|--------------------------------------|
| **Authentication**            |                                      |
| `POST /api/auth/login`        | User login                          |
| `POST /api/users/register`    | User registration                   |
| **Products**                  |                                      |
| `GET /api/products`           | Fetch paginated product list        |
| `GET /api/products/{id}`      | Fetch product details               |
| **Orders**                    |                                      |
| `POST /api/orders/checkout`   | Create a new order                  |
| `POST /api/orders/{orderId}/complete` | Complete a pending order     |
| `GET /api/orders`             | Fetch user-specific orders          |

### Backend Structure

```plaintext
src/main/java/com/example/ecommerce
├── controller      # REST Controllers
├── dto             # Data Transfer Objects
├── entity          # JPA Entities
├── repository      # Data Access Layer
├── service         # Business Logic Layer
├── util            # Utility Classes (e.g., JWT Utility)
├── config          # Security Configuration
```

## Frontend Overview

The frontend is developed using **React**, designed to seamlessly interact with the backend and provide a responsive user interface.

### Technologies & Techniques

- **React**: Component-driven design.
- **Material-UI (MUI)**: Modern, accessible, and responsive UI components.
- **React Router**: Manages navigation and routing.
- **Axios**: Simplifies API communication.
- **Local Storage**: Maintains cart state across sessions.

### Pages & Features

### Pages & Features

| Page                  | Description                                                                |
|-----------------------|----------------------------------------------------------------------------|
| **Home Page**         | Displays paginated product listings.                                      |
| **Product Details**   | Provides detailed product information and an "Add to Cart" button.        |
| **Cart Page**         | Lists selected products with quantity management and checkout.            |
| **Order Confirmation**| Displays order details post-checkout.                                     |
| **Login Page**        | Allows users to log in to their accounts.                                 |
| **Register Page**     | Enables new users to create an account.                                   |
| **Dashboard**         | Displays user-specific orders and account information.                   |


### UI Design

The UI design prioritizes simplicity and clarity. Default Material-UI themes and colors are used to emphasize the API interactions over UI styling.

### Frontend Structure

```plaintext
src/
├── api              # API interaction logic
├── components       # Reusable components (e.g., Navbar, Footer)
├── pages            # Main pages (e.g., HomePage, CartPage)
├── routes           # Route management
├── App.jsx          # Entry point
```
