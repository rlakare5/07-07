
# ChillFizz Admin Panel Setup Instructions

## Prerequisites
- XAMPP installed on your system
- Web browser

## Installation Steps

### 1. Database Setup
1. Start XAMPP and run Apache and MySQL services
2. Open phpMyAdmin in your browser: `http://localhost/phpmyadmin`
3. Import the database schema:
   - Go to the SQL tab
   - Copy and paste the contents of `admin/setup/database_setup.sql`
   - Click "Go" to execute

### 2. File Setup
1. Copy the entire `admin` folder to your XAMPP `htdocs` directory
   - Path should be: `C:\xampp\htdocs\admin` (Windows) or `/opt/lampp/htdocs/admin` (Linux)

### 3. Configuration
1. Open `admin/config/database.php`
2. Verify the database connection settings:
   - Host: `localhost`
   - Database: `chillfizz_db`
   - Username: `root`
   - Password: `` (empty for default XAMPP)

### 4. Access Admin Panel
1. Open your browser and go to: `http://localhost/admin`
2. Login with default credentials:
   - Username: `admin`
   - Password: `admin123`

### 5. Update React Frontend
1. Update your React components to fetch data from: `http://localhost/admin/api/`
2. The API endpoints are:
   - Services: `http://localhost/admin/api/services.php`
   - Reviews: `http://localhost/admin/api/reviews.php`
   - Clients: `http://localhost/admin/api/clients.php`

## Features
- Complete CRUD operations for Services, Employee Reviews, and Clients
- Real-time data synchronization between admin panel and React frontend
- Responsive admin interface
- Secure session-based authentication

## Security Notes
- Change default admin credentials after first login
- Implement proper password hashing for production use
- Add input validation and sanitization
- Use HTTPS in production environment

## API Endpoints
- `GET /admin/api/services.php` - Fetch all services
- `GET /admin/api/reviews.php` - Fetch all employee reviews  
- `GET /admin/api/clients.php` - Fetch all clients

## Support
If you need any modifications or additional features, please let me know!
