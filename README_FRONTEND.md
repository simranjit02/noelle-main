# Noelle Cosmetics - Frontend (React App)

A modern React-based e-commerce frontend for the Noelle cosmetics store. The app fetches product data from a PHP/MySQL backend API.

---

## 📋 Prerequisites

Before starting the frontend, ensure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Backend API running** on `http://localhost:5000` (See Backend README)
- **.env file configured** with API URL

Check versions:

```bash
node --version
npm --version
```

---

## 🔧 Configuration

### 1. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

### 2. Configure `.env` File

Edit `.env` and set the API URL:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PRODUCTS_ENDPOINT=/api/products.php
```

**Note:** Default values are already set, but you can customize the port if needed.

---

## 📁 Project Structure

```
noelle-main/
├── src/
│   ├── App.js                    # Main app component
│   ├── HomePage/
│   │   └── components/
│   │       ├── BestSellers.jsx   # Uses /api/products.php?limit=6
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       └── ...
│   ├── AllProducts/
│   │   └── components/
│   │       ├── AllMakeup.jsx     # Uses /api/products.php?category=
│   │       ├── Face.jsx          # Uses /api/products.php?category=Face
│   │       ├── Lips.jsx          # Uses /api/products.php?category=Lips
│   │       ├── Eyes.jsx          # Uses /api/products.php?category=Eye
│   │       ├── NewProducts.jsx   # Uses /api/products.php?new=1
│   │       ├── BestSellers.jsx   # Uses /api/products.php?new=1
│   │       └── Cart.jsx          # Uses /api/products.php?id=
│   └── store/
│       └── jotaistore.js         # Global state management
├── public/
│   └── index.html
├── .env                          # Environment variables
├── .env.example                  # Example environment file
├── package.json                  # Dependencies
└── README_FRONTEND.md            # This file

```

---

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
cd /Users/simranjitsingh/clg-prj/noelle-main
npm install
# or
yarn install
```

### Step 2: Ensure Backend is Running

Before starting the frontend, make sure the backend API is running:

```bash
# In a separate terminal
cd /Users/simranjitsingh/clg-prj/noelle-backend
php -S localhost:5000
```

Test the backend with:

```bash
curl http://localhost:5000/api/products.php
```

### Step 3: Start the Frontend

```bash
cd /Users/simranjitsingh/clg-prj/noelle-main
npm start
```

The app will open automatically at: **http://localhost:3000**

---

## ▶️ Starting the Frontend

### Quick Start (Single Command)

```bash
cd /Users/simranjitsingh/clg-prj/noelle-main && npm start
```

### Start with npm

```bash
cd /Users/simranjitsingh/clg-prj/noelle-main
npm start
```

### Start with yarn

```bash
cd /Users/simranjitsingh/clg-prj/noelle-main
yarn start
```

**Expected Output:**

```
Compiled successfully!

You can now view noelle in the browser.

  http://localhost:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

---

## ⏹️ Stopping the Frontend

### Method 1: Using Keyboard Shortcut

```
Press: Ctrl + C (on Windows/Linux)
or     Cmd + C (on macOS)
```

### Method 2: Kill the Process

**Find the process:**

```bash
lsof -i :3000
```

**Kill the process:**

```bash
kill -9 <PID>
# Example: kill -9 12345
```

### Method 3: Using Terminal Commands

**Windows:**

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**

```bash
lsof -ti :3000 | xargs kill -9
```

---

## 📦 Available Commands

### Development

```bash
npm start              # Start development server (port 3000)
npm run build          # Create production build
npm test               # Run tests
npm run eject          # Eject (irreversible - not recommended)
```

---

## 🔗 API Integration

All components fetch data from the backend API using the `fetch` API:

```javascript
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
fetch(`${apiUrl}/api/products.php?category=Lips`)
  .then((res) => res.json())
  .then((data) => setProducts(data))
  .catch((err) => console.error("Error:", err));
```

### Available API Endpoints

| Endpoint                          | Purpose              |
| --------------------------------- | -------------------- |
| `/api/products.php`               | Get all products     |
| `/api/products.php?category=Lips` | Get Lips products    |
| `/api/products.php?category=Face` | Get Face products    |
| `/api/products.php?category=Eye`  | Get Eye products     |
| `/api/products.php?new=1`         | Get new products     |
| `/api/products.php?popular=1`     | Get popular products |
| `/api/products.php?limit=6`       | Get 6 products       |
| `/api/products.php?id=Lips_1`     | Get single product   |

---

## 🧪 Troubleshooting

### Issue: `Cannot find module` or dependencies not installed

**Solution:**

```bash
rm -rf node_modules
npm install
npm start
```

### Issue: Port 3000 already in use

**Solution 1:** Kill the process on port 3000 (see Stopping section)

**Solution 2:** Use a different port

```bash
PORT=3001 npm start
```

### Issue: Backend API not responding

**Verify backend is running:**

```bash
curl http://localhost:5000/api/products.php
```

**If not running, start it:**

```bash
cd /Users/simranjitsingh/clg-prj/noelle-backend
php -S localhost:5000
```

### Issue: Products not loading

1. Check browser console (F12) for errors
2. Verify `.env` file has correct API URL
3. Check that backend is running: `curl http://localhost:5000/api/products.php`
4. Check network tab in browser DevTools to see API calls

### Issue: CORS Error

**Error:** `Cross-Origin Request Blocked`

**Solution:** Backend already has CORS enabled, but if you see this error:

1. Verify backend is at `http://localhost:5000`
2. Check `.env` file for correct API URL
3. Restart both backend and frontend

---

## 📚 Component Overview

### Components using Backend API:

1. **BestSellers.jsx** (HomePage)
   - Fetches: `/api/products.php?limit=6`
   - Displays: 6 best-selling products on homepage

2. **AllMakeup.jsx**
   - Fetches: `/api/products.php?category={category}`
   - Displays: All products with category filter

3. **Face.jsx**
   - Fetches: `/api/products.php?category=Face`
   - Displays: All face products

4. **Lips.jsx**
   - Fetches: `/api/products.php?category=Lips`
   - Displays: All lip products

5. **Eyes.jsx**
   - Fetches: `/api/products.php?category=Eye`
   - Displays: All eye products

6. **NewProducts.jsx**
   - Fetches: `/api/products.php?new=1`
   - Displays: Newly launched products

7. **BestSellers.jsx** (AllProducts)
   - Fetches: `/api/products.php?new=1`
   - Displays: Best seller products

8. **Cart.jsx**
   - Fetches: `/api/products.php?id={id}`
   - Displays: Cart items

---

## 🛒 Features

- ✅ Browse all products
- ✅ Filter by category (Lips, Face, Eyes)
- ✅ View new products
- ✅ View popular products
- ✅ Add to cart
- ✅ Real-time data from MySQL database
- ✅ Responsive design with Tailwind CSS
- ✅ Global state management with Jotai

---

## 📝 Notes

- The app runs in **development mode** by default
- Hot reload enabled - changes save automatically
- Frontend connects to backend at `http://localhost:5000`
- Database is on `localhost:3306` (MySQL)
- All data comes from the MySQL `noelle_store` database

---

## 🔗 Related Documentation

- [Backend README](../noelle-backend/README.md) - Backend setup and API documentation
- [React Documentation](https://react.dev) - React framework docs
- [Tailwind CSS](https://tailwindcss.com) - For styling
- [Jotai Documentation](https://jotai.org) - State management

---

## 📞 Support

For issues or questions:

1. Check the troubleshooting section above
2. Verify backend is running
3. Check browser console for errors
4. Check terminal output for error messages

---

**Last Updated:** March 15, 2026  
**Frontend Version:** React 18+  
**Backend API:** PHP 8.2+ with MySQL 9.0+
