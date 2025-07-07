
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
    if ($_POST['action'] === 'add') {
        $stmt = $db->prepare("INSERT INTO employee_reviews (name, image_url, review_text, card_class, background_color, rotation) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$_POST['name'], $_POST['image_url'], $_POST['review_text'], $_POST['card_class'], $_POST['background_color'], $_POST['rotation']]);
    }

    if ($_POST['action'] === 'edit') {
        $stmt = $db->prepare("UPDATE employee_reviews SET name=?, image_url=?, review_text=?, card_class=?, background_color=?, rotation=? WHERE id=?");
        $stmt->execute([$_POST['name'], $_POST['image_url'], $_POST['review_text'], $_POST['card_class'], $_POST['background_color'], $_POST['rotation'], $_POST['id']]);
    }

    if ($_POST['action'] === 'delete') {
        $stmt = $db->prepare("DELETE FROM employee_reviews WHERE id=?");
        $stmt->execute([$_POST['id']]);
    }
}

$reviews = $db->query("SELECT * FROM employee_reviews ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
$totalReviews = count($reviews);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Reviews - ChillFizz Admin</title>
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

        .stats-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 24px;
        }

        .stat-card {
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-2px);
        }

        .stat-card .icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            font-size: 24px;
        }

        .stat-card.reviews .icon {
            background-color: var(--light-blue);
            color: var(--primary-blue);
        }

        .stat-card.active .icon {
            background-color: var(--light-green);
            color: var(--success-green);
        }

        .stat-card.pending .icon {
            background-color: var(--light-yellow);
            color: var(--warning-yellow);
        }

        .stat-card .number {
            font-size: 2rem;
            font-weight: 700;
            color: #202124;
            margin-bottom: 4px;
        }

        .stat-card .label {
            color: #5f6368;
            font-size: 0.9rem;
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
            display: flex;
            justify-content: between;
            align-items: center;
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

        .table {
            margin-bottom: 0;
        }

        .table th {
            background-color: #f8f9fa;
            color: #5f6368;
            font-weight: 600;
            border-bottom: 2px solid var(--border-color);
            padding: 16px;
        }

        .table td {
            padding: 16px;
            vertical-align: middle;
            border-bottom: 1px solid var(--border-color);
        }

        .table tbody tr:hover {
            background-color: #f8f9fa;
        }

        .btn-sm {
            padding: 6px 12px;
            font-size: 0.875rem;
            border-radius: 6px;
        }

        .btn-warning {
            background-color: var(--warning-yellow);
            border-color: var(--warning-yellow);
            color: #202124;
        }

        .btn-danger {
            background-color: var(--danger-red);
            border-color: var(--danger-red);
        }

        .modal-content {
            border-radius: 12px;
            border: none;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .modal-header {
            background-color: #f8f9fa;
            border-bottom: 1px solid var(--border-color);
            border-radius: 12px 12px 0 0;
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

        .review-preview {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .employee-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 12px;
        }

        .employee-info {
            display: flex;
            align-items: center;
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
                    <a class="nav-link active" href="reviews.php">
                        <i class="fas fa-star"></i>Employee Reviews
                    </a>
                    <a class="nav-link" href="clients.php">
                        <i class="fas fa-users"></i>Clients
                    </a>
                    <a class="nav-link" href="director.php">
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
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h1 class="page-title">Employee Reviews Management</h1>
                                <p class="page-subtitle">Manage customer testimonials and reviews</p>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addReviewModal">
                                <i class="fas fa-plus me-2"></i>Add New Review
                            </button>
                        </div>
                    </div>

                    <!-- Stats Cards -->
                    <div class="stats-cards">
                        <div class="stat-card reviews">
                            <div class="icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="number"><?php echo $totalReviews; ?></div>
                            <div class="label">Total Reviews</div>
                        </div>
                        <div class="stat-card active">
                            <div class="icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="number"><?php echo $totalReviews; ?></div>
                            <div class="label">Active Reviews</div>
                        </div>
                        <div class="stat-card pending">
                            <div class="icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="number">0</div>
                            <div class="label">Pending Approval</div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="content-card">
                        <div class="card-header">
                            <h5 class="mb-0">Recent Activity</h5>
                        </div>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Review</th>
                                        <th>Style</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($reviews as $review): ?>
                                    <tr>
                                        <td>
                                            <div class="employee-info">
                                                <img src="<?php echo htmlspecialchars($review['image_url']); ?>" 
                                                     alt="<?php echo htmlspecialchars($review['name']); ?>" 
                                                     class="employee-avatar">
                                                <div>
                                                    <div style="font-weight: 600; color: #202124;">
                                                        <?php echo htmlspecialchars($review['name']); ?>
                                                    </div>
                                                    <div style="font-size: 0.8rem; color: #5f6368;">
                                                        ID: <?php echo $review['id']; ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="review-preview">
                                                <?php echo substr(htmlspecialchars($review['review_text']), 0, 80) . '...'; ?>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge bg-secondary">
                                                <?php echo htmlspecialchars($review['card_class']); ?>
                                            </span>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-warning me-2 edit-btn" 
                                                    data-id="<?php echo $review['id']; ?>"
                                                    data-name="<?php echo htmlspecialchars($review['name']); ?>"
                                                    data-image-url="<?php echo htmlspecialchars($review['image_url']); ?>"
                                                    data-review-text="<?php echo htmlspecialchars($review['review_text']); ?>"
                                                    data-card-class="<?php echo $review['card_class']; ?>"
                                                    data-background-color="<?php echo $review['background_color']; ?>"
                                                    data-rotation="<?php echo $review['rotation']; ?>"
                                                    data-bs-toggle="modal" data-bs-target="#editReviewModal">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <form method="POST" style="display: inline;">
                                                <input type="hidden" name="action" value="delete">
                                                <input type="hidden" name="id" value="<?php echo $review['id']; ?>">
                                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this review?')">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Review Modal -->
    <div class="modal fade" id="addReviewModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Employee Review</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form method="POST">
                    <div class="modal-body">
                        <input type="hidden" name="action" value="add">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Employee Name</label>
                                    <input type="text" class="form-control" name="name" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Image URL</label>
                                    <input type="url" class="form-control" name="image_url" required>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Review Text</label>
                            <textarea class="form-control" name="review_text" rows="3" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Card Class</label>
                                    <select class="form-control" name="card_class">
                                        <option value="card-mint">Mint</option>
                                        <option value="card-sky">Sky</option>
                                        <option value="card-sun">Sun</option>
                                        <option value="card-lavender">Lavender</option>
                                        <option value="card-coral">Coral</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Background Color</label>
                                    <input type="text" class="form-control" name="background_color" placeholder="linear-gradient(135deg, #b2dfdb, #80cbc4)">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Rotation</label>
                                    <select class="form-control" name="rotation">
                                        <option value="rotate(-3deg)">-3 degrees</option>
                                        <option value="rotate(-2deg)">-2 degrees</option>
                                        <option value="rotate(-1deg)">-1 degree</option>
                                        <option value="rotate(0deg)">0 degrees</option>
                                        <option value="rotate(1deg)">1 degree</option>
                                        <option value="rotate(2deg)">2 degrees</option>
                                        <option value="rotate(3deg)">3 degrees</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Review</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Edit Review Modal -->
    <div class="modal fade" id="editReviewModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Employee Review</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form method="POST">
                    <div class="modal-body">
                        <input type="hidden" name="action" value="edit">
                        <input type="hidden" name="id" id="edit_id">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Employee Name</label>
                                    <input type="text" class="form-control" name="name" id="edit_name" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Image URL</label>
                                    <input type="url" class="form-control" name="image_url" id="edit_image_url" required>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Review Text</label>
                            <textarea class="form-control" name="review_text" id="edit_review_text" rows="3" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Card Class</label>
                                    <select class="form-control" name="card_class" id="edit_card_class">
                                        <option value="card-mint">Mint</option>
                                        <option value="card-sky">Sky</option>
                                        <option value="card-sun">Sun</option>
                                        <option value="card-lavender">Lavender</option>
                                        <option value="card-coral">Coral</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Background Color</label>
                                    <input type="text" class="form-control" name="background_color" id="edit_background_color">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Rotation</label>
                                    <select class="form-control" name="rotation" id="edit_rotation">
                                        <option value="rotate(-3deg)">-3 degrees</option>
                                        <option value="rotate(-2deg)">-2 degrees</option>
                                        <option value="rotate(-1deg)">-1 degree</option>
                                        <option value="rotate(0deg)">0 degrees</option>
                                        <option value="rotate(1deg)">1 degree</option>
                                        <option value="rotate(2deg)">2 degrees</option>
                                        <option value="rotate(3deg)">3 degrees</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Update Review</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.getElementById('edit_id').value = this.dataset.id;
                document.getElementById('edit_name').value = this.dataset.name;
                document.getElementById('edit_image_url').value = this.dataset.imageUrl;
                document.getElementById('edit_review_text').value = this.dataset.reviewText;
                document.getElementById('edit_card_class').value = this.dataset.cardClass;
                document.getElementById('edit_background_color').value = this.dataset.backgroundColor;
                document.getElementById('edit_rotation').value = this.dataset.rotation;
            });
        });
    </script>
</body>
</html>
