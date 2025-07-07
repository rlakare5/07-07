
<?php
session_start();
require_once 'config/database.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit();
}

$database = new Database();
$db = $database->getConnection();

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['action'] === 'update') {
        // Check if record exists
        $stmt = $db->query("SELECT COUNT(*) FROM director_message");
        $count = $stmt->fetchColumn();
        
        if ($count > 0) {
            // Update existing record
            $stmt = $db->prepare("UPDATE director_message SET title=?, message=?, director_name=?, director_position=?, updated_at=NOW() WHERE id=(SELECT id FROM (SELECT id FROM director_message ORDER BY id DESC LIMIT 1) as temp)");
            $stmt->execute([$_POST['title'], $_POST['message'], $_POST['director_name'], $_POST['director_position']]);
        } else {
            // Insert new record
            $stmt = $db->prepare("INSERT INTO director_message (title, message, director_name, director_position, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())");
            $stmt->execute([$_POST['title'], $_POST['message'], $_POST['director_name'], $_POST['director_position']]);
        }
        $success = "Director message updated successfully!";
    }
}

// Get current director message
$stmt = $db->query("SELECT * FROM director_message ORDER BY id DESC LIMIT 1");
$current_message = $stmt->fetch(PDO::FETCH_ASSOC);

// Default values if no message exists
if (!$current_message) {
    $current_message = [
        'title' => 'Welcome to ChillFizz',
        'message' => 'At ChillFizz, we believe that every sip should be a moment of pure refreshment and joy. Our commitment to quality and innovation drives us to create the most delicious and nutritious beverages for our valued customers.',
        'director_name' => 'Aryan Vaidya',
        'director_position' => 'Director & Founder'
    ];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Director Message - ChillFizz Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-blue: #4285f4;
            --light-blue: #e8f0fe;
            --success-green: #34a853;
            --light-green: #e6f4ea;
            --warning-yellow: #fbbc04;
            --light-yellow: #fef7e0;
            --danger-red: #ea4335;
            --light-red: #fce8e6;
            --sidebar-bg: #f8f9fa;
            --border-color: #e0e0e0;
        }

        body {
            background-color: #f5f7fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .sidebar {
            background-color: var(--sidebar-bg);
            min-height: 100vh;
            border-right: 1px solid var(--border-color);
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .sidebar .nav-link {
            color: #5f6368;
            padding: 12px 20px;
            margin: 4px 12px;
            border-radius: 8px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
        }

        .sidebar .nav-link:hover {
            background-color: var(--light-blue);
            color: var(--primary-blue);
        }

        .sidebar .nav-link.active {
            background-color: var(--primary-blue);
            color: white;
        }

        .sidebar .nav-link i {
            width: 20px;
            margin-right: 12px;
        }

        .header-section {
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 24px;
        }

        .content-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .content-card .card-header {
            background: white;
            border-bottom: 1px solid var(--border-color);
            padding: 20px 24px;
        }

        .btn-primary {
            background-color: var(--primary-blue);
            border-color: var(--primary-blue);
            border-radius: 8px;
            padding: 8px 16px;
            font-weight: 500;
        }

        .btn-primary:hover {
            background-color: #3367d6;
            border-color: #3367d6;
        }

        .form-control {
            border-radius: 8px;
            border: 1px solid var(--border-color);
            padding: 12px;
        }

        .form-control:focus {
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 0.2rem rgba(66, 133, 244, 0.25);
        }

        .admin-header {
            color: #202124;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .admin-subtitle {
            color: #5f6368;
            font-size: 0.9rem;
        }

        .page-title {
            color: #202124;
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .page-subtitle {
            color: #5f6368;
            font-size: 0.9rem;
            margin-bottom: 0;
        }

        .preview-card {
            background: linear-gradient(135deg, #fdf1ec 30%, #f8e2d6 100%);
            border-radius: 12px;
            padding: 40px;
            margin-top: 24px;
            position: relative;
            overflow: hidden;
        }

        .preview-card::before {
            content: '';
            position: absolute;
            top: -60px;
            left: -60px;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, #ffc5c5, #fff0e3);
            border-radius: 50%;
            filter: blur(40px);
            opacity: 0.3;
        }

        .director-avatar {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #fca5a5, #fcd34d);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            border: 3px solid white;
            box-shadow: 0 8px 20px rgba(255, 165, 47, 0.3);
        }

        .director-avatar span {
            font-size: 32px;
            color: white;
        }

        .preview-title {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(90deg, #f97316, #db2777);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            margin-bottom: 16px;
        }

        .preview-message {
            font-size: 16px;
            line-height: 1.6;
            color: #444;
            text-align: center;
            margin-bottom: 30px;
        }

        .preview-signature {
            text-align: center;
        }

        .preview-signature .line {
            height: 2px;
            width: 80px;
            margin: 0 auto 8px;
            background: linear-gradient(to right, #f97316, #f43f5e);
        }

        .director-name {
            font-size: 16px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 4px;
        }

        .director-position {
            font-size: 12px;
            color: #555;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-2 sidebar p-0">
                <div class="p-3">
                    <div class="admin-header">ChillFizz Admin</div>
                    <div class="admin-subtitle">System Administrator</div>
                </div>
                <nav class="nav flex-column mt-4">
                    <a class="nav-link" href="index.php">
                        <i class="fas fa-chart-line"></i>Overview
                    </a>
                    <a class="nav-link" href="services.php">
                        <i class="fas fa-cogs"></i>Services
                    </a>
                    <a class="nav-link" href="reviews.php">
                        <i class="fas fa-star"></i>Employee Reviews
                    </a>
                    <a class="nav-link" href="clients.php">
                        <i class="fas fa-users"></i>Clients
                    </a>
                    <a class="nav-link active" href="director.php">
                        <i class="fas fa-user-tie"></i>Director Message
                    </a>
                    <a class="nav-link" href="logout.php">
                        <i class="fas fa-sign-out-alt"></i>Logout
                    </a>
                </nav>
            </div>

            <!-- Main Content -->
            <div class="col-md-10">
                <div class="p-4">
                    <!-- Header Section -->
                    <div class="header-section">
                        <div>
                            <h1 class="page-title">Director Message Management</h1>
                            <p class="page-subtitle">Manage the director's welcome message displayed on the website</p>
                        </div>
                    </div>

                    <?php if (isset($success)): ?>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="fas fa-check-circle me-2"></i><?php echo $success; ?>
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                    <?php endif; ?>

                    <!-- Form Card -->
                    <div class="content-card">
                        <div class="card-header">
                            <h5 class="mb-0">Edit Director Message</h5>
                        </div>
                        <div class="card-body p-4">
                            <form method="POST">
                                <input type="hidden" name="action" value="update">
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">Title</label>
                                            <input type="text" class="form-control" name="title" 
                                                   value="<?php echo htmlspecialchars($current_message['title']); ?>" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">Director Name</label>
                                            <input type="text" class="form-control" name="director_name" 
                                                   value="<?php echo htmlspecialchars($current_message['director_name']); ?>" required>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <label class="form-label">Message</label>
                                    <textarea class="form-control" name="message" rows="4" required><?php echo htmlspecialchars($current_message['message']); ?></textarea>
                                </div>
                                
                                <div class="mb-3">
                                    <label class="form-label">Director Position</label>
                                    <input type="text" class="form-control" name="director_position" 
                                           value="<?php echo htmlspecialchars($current_message['director_position']); ?>" required>
                                </div>
                                
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save me-2"></i>Update Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Preview Card -->
                    <div class="preview-card">
                        <h6 class="text-muted mb-3"><i class="fas fa-eye me-2"></i>Preview</h6>
                        <div class="director-avatar">
                            <span>👔</span>
                        </div>
                        <h2 class="preview-title"><?php echo htmlspecialchars($current_message['title']); ?></h2>
                        <p class="preview-message"><?php echo htmlspecialchars($current_message['message']); ?></p>
                        <div class="preview-signature">
                            <div class="line"></div>
                            <div class="director-name"><?php echo htmlspecialchars($current_message['director_name']); ?></div>
                            <div class="director-position"><?php echo htmlspecialchars($current_message['director_position']); ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
