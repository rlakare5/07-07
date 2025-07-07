
<?php
session_start();
require_once 'config/database.php';

// Simple authentication (you can enhance this)
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit();
}

$database = new Database();
$db = $database->getConnection();

// Get counts for dashboard
$services_count = $db->query("SELECT COUNT(*) FROM services")->fetchColumn();
$reviews_count = $db->query("SELECT COUNT(*) FROM employee_reviews")->fetchColumn();
$clients_count = $db->query("SELECT COUNT(*) FROM clients")->fetchColumn();

// Get recent activity
$recent_services = $db->query("SELECT title, created_at FROM services ORDER BY created_at DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);
$recent_reviews = $db->query("SELECT name, created_at FROM employee_reviews ORDER BY created_at DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChillFizz Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-blue: #4f46e5;
            --sidebar-bg: #f8fafc;
            --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            --border-color: #e2e8f0;
        }

        body {
            background-color: #f1f5f9;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        .sidebar {
            background-color: var(--sidebar-bg);
            border-right: 1px solid var(--border-color);
            min-height: 100vh;
            width: 250px;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
        }

        .sidebar .user-profile {
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .sidebar .user-avatar {
            width: 40px;
            height: 40px;
            background: var(--primary-blue);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
        }

        .sidebar .user-info h6 {
            margin: 0;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1e293b;
        }

        .sidebar .user-info p {
            margin: 0;
            font-size: 0.75rem;
            color: #64748b;
        }

        .nav-menu {
            padding: 1rem 0;
        }

        .nav-menu .nav-item {
            margin: 0.25rem 1rem;
        }

        .nav-menu .nav-link {
            color: #64748b !important;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s;
        }

        .nav-menu .nav-link:hover {
            background-color: #e2e8f0;
            color: #1e293b !important;
        }

        .nav-menu .nav-link.active {
            background-color: var(--primary-blue);
            color: white !important;
        }

        .main-content {
            margin-left: 250px;
            padding: 2rem;
        }

        .page-header {
            margin-bottom: 2rem;
        }

        .page-title {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1e293b;
            margin: 0;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: var(--card-shadow);
            border: 1px solid var(--border-color);
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
        }

        .stat-card.blue::before { background: #3b82f6; }
        .stat-card.green::before { background: #10b981; }
        .stat-card.yellow::before { background: #f59e0b; }
        .stat-card.red::before { background: #ef4444; }

        .stat-header {
            display: flex;
            justify-content: between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }

        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }

        .stat-icon.blue { background: #dbeafe; color: #3b82f6; }
        .stat-icon.green { background: #d1fae5; color: #10b981; }
        .stat-icon.yellow { background: #fef3c7; color: #f59e0b; }
        .stat-icon.red { background: #fee2e2; color: #ef4444; }

        .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #1e293b;
            margin: 0;
        }

        .stat-label {
            font-size: 0.875rem;
            color: #64748b;
            margin: 0;
        }

        .activity-card {
            background: white;
            border-radius: 12px;
            box-shadow: var(--card-shadow);
            border: 1px solid var(--border-color);
        }

        .activity-header {
            padding: 1.5rem 1.5rem 0;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 0;
        }

        .activity-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 1.5rem 0;
        }

        .activity-list {
            padding: 0;
            margin: 0;
        }

        .activity-item {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .activity-item:last-child {
            border-bottom: none;
        }

        .activity-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            flex-shrink: 0;
        }

        .activity-content {
            flex: 1;
        }

        .activity-text {
            font-size: 0.875rem;
            color: #1e293b;
            margin: 0 0 0.25rem 0;
        }

        .activity-date {
            font-size: 0.75rem;
            color: #64748b;
            margin: 0;
        }

        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }
            .main-content {
                margin-left: 0;
            }
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="user-profile">
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-info">
                <h6>System Administrator</h6>
                <p>Admin</p>
            </div>
        </div>

        <nav class="nav-menu">
            <div class="nav-item">
                <a class="nav-link active" href="index.php">
                    <i class="fas fa-chart-pie"></i>
                    Overview
                </a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="services.php">
                    <i class="fas fa-cogs"></i>
                    Services
                </a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="reviews.php">
                    <i class="fas fa-star"></i>
                    Employee Reviews
                </a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="clients.php">
                    <i class="fas fa-users"></i>
                    Clients
                </a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="director.php">
                    <i class="fas fa-user-tie"></i>
                    Director Message
                </a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="logout.php">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </a>
            </div>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <div class="page-header">
            <h1 class="page-title">Dashboard Overview</h1>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stat-card blue">
                <div class="stat-icon blue">
                    <i class="fas fa-users"></i>
                </div>
                <h2 class="stat-number"><?php echo $services_count; ?></h2>
                <p class="stat-label">Total Services</p>
            </div>

            <div class="stat-card green">
                <div class="stat-icon green">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <h2 class="stat-number"><?php echo $reviews_count; ?></h2>
                <p class="stat-label">Total Reviews</p>
            </div>

            <div class="stat-card yellow">
                <div class="stat-icon yellow">
                    <i class="fas fa-certificate"></i>
                </div>
                <h2 class="stat-number"><?php echo $clients_count; ?></h2>
                <p class="stat-label">Total Clients</p>
            </div>

            <div class="stat-card red">
                <div class="stat-icon red">
                    <i class="fas fa-chart-line"></i>
                </div>
                <h2 class="stat-number">0</h2>
                <p class="stat-label">Total Opportunities</p>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="activity-card">
            <div class="activity-header">
                <h3 class="activity-title">Recent Activity</h3>
            </div>
            <div class="activity-list">
                <?php if (!empty($recent_services)): ?>
                    <?php foreach (array_slice($recent_services, 0, 3) as $service): ?>
                        <div class="activity-item">
                            <div class="activity-icon blue">
                                <i class="fas fa-cogs"></i>
                            </div>
                            <div class="activity-content">
                                <p class="activity-text">New service added: <strong><?php echo htmlspecialchars($service['title']); ?></strong></p>
                                <p class="activity-date"><?php echo $service['created_at'] ? date('M d, Y', strtotime($service['created_at'])) : 'Recently'; ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>

                <?php if (!empty($recent_reviews)): ?>
                    <?php foreach (array_slice($recent_reviews, 0, 2) as $review): ?>
                        <div class="activity-item">
                            <div class="activity-icon green">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="activity-content">
                                <p class="activity-text">New review added: <strong><?php echo htmlspecialchars($review['name']); ?></strong></p>
                                <p class="activity-date"><?php echo $review['created_at'] ? date('M d, Y', strtotime($review['created_at'])) : 'Recently'; ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>

                <?php if (empty($recent_services) && empty($recent_reviews)): ?>
                    <div class="activity-item">
                        <div class="activity-icon yellow">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="activity-content">
                            <p class="activity-text">No recent activity</p>
                            <p class="activity-date">Start by adding services or reviews</p>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
