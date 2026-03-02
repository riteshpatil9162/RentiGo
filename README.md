# RentiGo - Professional House Renting Platform

RentiGo is a modern, full-stack MERN (MongoDB, Express.js, React, Node.js) application designed for house renting. Built with a professional UI suitable for national-level hackathons.

## Features

### For Tenants
- Browse and search properties with advanced filters
- View detailed property information with images
- Save favorite properties
- Book properties with secure Razorpay payment integration
- Track booking status and history
- User dashboard for managing profile and bookings

### For Property Owners
- List properties with detailed information
- Manage property listings
- Track bookings and rental inquiries
- Receive payments securely through Razorpay

### General Features
- JWT-based authentication and authorization
- Role-based access control (User, Owner, Admin)
- Responsive design for all devices
- Professional, production-ready UI
- Secure payment processing with Razorpay
- MongoDB Atlas database integration

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Razorpay** - Payment gateway integration

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **React DatePicker** - Date selection

## Project Structure

```
RentiGo/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   ├── bookingController.js
│   │   ├── paymentController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── property.js
│   │   ├── booking.js
│   │   ├── payment.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Footer.js
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Properties.js
│   │   │   ├── PropertyDetails.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── AddProperty.js
│   │   │   ├── MyBookings.js
│   │   │   └── SavedProperties.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Razorpay account (for payment integration)
- Cloudinary account (optional, for image uploads)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your credentials:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
```

5. Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

5. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to the `.env` file

## Razorpay Setup

1. Create a Razorpay account at https://razorpay.com/
2. Navigate to Settings > API Keys
3. Generate API keys (Key ID and Key Secret)
4. Add the keys to both backend and frontend `.env` files
5. For testing, use Razorpay's test mode

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/update-profile` - Update user profile (Protected)
- `PUT /api/auth/update-password` - Update password (Protected)

### Properties
- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (Owner/Admin only)
- `PUT /api/properties/:id` - Update property (Owner/Admin only)
- `DELETE /api/properties/:id` - Delete property (Owner/Admin only)
- `POST /api/properties/:id/save` - Save/Unsave property (Protected)
- `GET /api/properties/my/properties` - Get owner's properties (Protected)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/my-bookings` - Get user's bookings (Protected)
- `GET /api/bookings/:id` - Get booking details (Protected)
- `PUT /api/bookings/:id/status` - Update booking status (Owner/Admin)
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)

### Payments
- `POST /api/payments/create-order` - Create Razorpay order (Protected)
- `POST /api/payments/verify` - Verify payment (Protected)

### Users
- `GET /api/users/:id` - Get user profile (Protected)
- `GET /api/users/saved/properties` - Get saved properties (Protected)

## Usage

### For Tenants

1. **Register/Login**
   - Create an account as a "Tenant"
   - Login with your credentials

2. **Browse Properties**
   - Use filters to search properties by location, type, price, etc.
   - View detailed property information
   - Save properties you're interested in

3. **Book a Property**
   - Click "Book Now" on a property details page
   - Select your preferred dates
   - Complete payment through Razorpay
   - Track your booking status in "My Bookings"

### For Property Owners

1. **Register/Login**
   - Create an account as a "Property Owner"
   - Login with your credentials

2. **List a Property**
   - Navigate to "Add Property" from the dashboard
   - Fill in all property details
   - Select amenities
   - Submit the listing

3. **Manage Bookings**
   - View booking requests
   - Confirm or reject bookings
   - Track rental payments

## Environment Variables

### Backend (.env)
```
MONGO_URI - MongoDB Atlas connection string
PORT - Server port (default: 5000)
NODE_ENV - Environment (development/production)
JWT_SECRET - Secret key for JWT tokens
JWT_EXPIRE - Token expiration time
RAZORPAY_KEY_ID - Razorpay key ID
RAZORPAY_KEY_SECRET - Razorpay key secret
CLOUDINARY_CLOUD_NAME - Cloudinary cloud name
CLOUDINARY_API_KEY - Cloudinary API key
CLOUDINARY_API_SECRET - Cloudinary API secret
FRONTEND_URL - Frontend URL for CORS
```

### Frontend (.env)
```
REACT_APP_API_URL - Backend API URL
REACT_APP_RAZORPAY_KEY_ID - Razorpay key ID
```

## Features in Detail

### Authentication & Authorization
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (User, Owner, Admin)
- Protected routes on both frontend and backend

### Property Management
- Advanced search and filtering
- Property type categorization
- Furnishing status
- Location-based search
- Image support
- Amenities selection

### Booking System
- Date range selection
- Security deposit calculation
- Booking status tracking (Pending, Confirmed, Cancelled)
- Owner approval workflow

### Payment Integration
- Secure Razorpay integration
- Order creation and verification
- Payment status tracking
- Support for test and live modes

### User Experience
- Responsive design for all devices
- Professional, modern UI
- Toast notifications for user feedback
- Loading states and error handling
- Smooth transitions and animations

## Deployment

### Backend Deployment (Heroku/Render)
1. Create a new app on your hosting platform
2. Set environment variables
3. Deploy the backend folder
4. Update FRONTEND_URL in backend .env

### Frontend Deployment (Vercel/Netlify)
1. Create a new project
2. Connect your repository
3. Set environment variables
4. Update REACT_APP_API_URL to your backend URL
5. Deploy

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- CORS configuration
- Secure payment processing
- Environment variable protection

## Future Enhancements

- [ ] Property image upload with Cloudinary
- [ ] Real-time chat between tenants and owners
- [ ] Email notifications
- [ ] Property reviews and ratings system
- [ ] Advanced map integration
- [ ] Property comparison feature
- [ ] Mobile app (React Native)
- [ ] Admin dashboard for platform management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email your_email@example.com or create an issue in the repository.

## Acknowledgments

- MongoDB for database
- Razorpay for payment gateway
- React community for excellent libraries
- All contributors and users

---

Built with ❤️ for national-level hackathons and real-world use.
