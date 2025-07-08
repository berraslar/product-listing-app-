Product Listing App - README
💍 Product Listing App
This project is a full-stack application where users can view a list of products and filter them by color, price range, popularity, and rating. The interface is modern and dynamically responsive.
🚀 Features
- Filter products by color (yellow, white, rose)
- List products based on price range
- Filter by minimum rating
- Sort products by popularity, price, or rating
- Detailed product cards with image sliders
- Responsive and modern user interface
🛠️ Technologies Used
Frontend:
- React.js (React Router, useState, useEffect)
- Axios (for API communication)
- HTML5 / CSS3
- Responsive design

Backend:
- Node.js
- Express.js
- Dummy JSON API (static product data)
📂 How to Run the Project
1. Backend:
```
cd backend
npm install
node index.js
```
The backend server runs at:
http://localhost:3001/api/products

2. Frontend:
```
cd frontend
npm install
npm start
```
The frontend app runs at:
http://localhost:5173

🔖 Notes
- A real gold price API was attempted for the backend, but due to pricing limitations, dummy data is used instead.
- All filtering functionality is handled dynamically on the frontend.
