@echo off
echo ================================
echo RentiGo Registration Diagnostics
echo ================================
echo.

echo [1/4] Checking if Backend is running on port 5000...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is running
    curl -s http://localhost:5000/api/health
) else (
    echo ❌ Backend is NOT running
    echo    Please start backend: cd backend ^&^& npm run dev
)
echo.

echo [2/4] Checking if Frontend is running on port 3000...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend is running
) else (
    echo ❌ Frontend is NOT running
    echo    Please start frontend: cd frontend ^&^& npm start
)
echo.

echo [3/4] Testing Registration Endpoint directly...
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Diagnostic Test\",\"email\":\"diagnostic@test.com\",\"password\":\"password123\",\"phone\":\"1111111111\",\"role\":\"user\"}" -s
echo.
echo.

echo [4/4] Checking Environment Variables...
echo Frontend .env file:
type "..\frontend\.env"
echo.
echo Backend .env (JWT_SECRET and MONGO_URI):
cd ..\backend
node -e "require('dotenv').config(); console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not Set'); console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Not Set'); console.log('PORT:', process.env.PORT);"
echo.

echo ================================
echo Diagnostic Complete
echo ================================
echo.
echo If you see any ❌, please fix those issues first.
echo.
echo Next Steps:
echo 1. Make sure both backend and frontend are running
echo 2. Open browser DevTools (F12) and check Console tab
echo 3. Try to register and look for detailed error messages
echo.
pause
