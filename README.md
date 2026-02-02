# 💰 Personal Expense Tracker (MERN Stack)

A full-stack personal expense tracker application built with MongoDB, Express, React, and Node.js (MERN Stack).

## ✨ Features

- **User Authentication**: Register and login with secure JWT authentication
- **Expense Management**: Create, read, update, and delete expenses
- **Categorization**: Organize expenses into 13 different categories
- **Date Filtering**: Filter expenses by date range
- **Sorting**: Sort by date, amount (high/low)
- **Visual Analytics**: 
  - Pie chart for category breakdown
  - Bar chart for monthly expenses
- **Summary Statistics**: Total expenses, top category, monthly totals
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🏗️ Project Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Expense.js      # Expense schema
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   └── expenses.js     # Expense CRUD routes
│   ├── .env                # Environment variables
│   ├── package.json
│   └── server.js           # Express server entry point
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Navbar.js
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   ├── ExpenseSummary.js
│   │   │   └── ExpenseChart.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd expense-tracker
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Backend Configuration**:
   
   Edit `backend/.env` and update the following:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   # Or use MongoDB Atlas connection string:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   ```

### Running the Application

1. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

2. **Start the Backend Server** (in one terminal):
   ```bash
   cd backend
   npm start
   ```
   Server will run on http://localhost:5000

3. **Start the Frontend Development Server** (in another terminal):
   ```bash
   cd client
   npm start
   ```
   Client will run on http://localhost:3000

4. **Open your browser** and navigate to http://localhost:3000

### Production Build

To create a production build of the frontend:

```bash
cd client
npm run build
```

The build folder will contain static files that can be served by the backend.

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Expense Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses (with filters) |
| GET | `/api/expenses/summary` | Get expense analytics |
| GET | `/api/expenses/:id` | Get single expense |
| POST | `/api/expenses` | Create expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |
| GET | `/api/expenses/categories/list` | Get category list |

### Query Parameters for GET /api/expenses

- `startDate`: Filter from date (YYYY-MM-DD)
- `endDate`: Filter until date (YYYY-MM-DD)
- `category`: Filter by category
- `sort`: Sort options (newest, oldest, amount-high, amount-low)

## 📊 Expense Categories

- Food
- Transportation
- Utilities
- Entertainment
- Shopping
- Healthcare
- Education
- Travel
- Groceries
- Dining Out
- Subscriptions
- Insurance
- Other

## 🛠️ Technologies Used

### Backend
- **Express.js**: Web framework for Node.js
- **MongoDB**: Database
- **Mongoose**: MongoDB ODM
- **JSON Web Token (JWT)**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-Origin Resource Sharing

### Frontend
- **React**: UI library
- **React Router**: Navigation
- **Axios**: HTTP client
- **Chart.js**: Data visualization
- **CSS3**: Styling with custom properties

## 📝 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this project and enhance it with your own features!

## 📧 Support

If you have any questions or issues, please feel free to open an issue.

