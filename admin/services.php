
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
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'add':
                $stmt = $db->prepare("INSERT INTO services (title, description, category, color, hover_color, icon_class, extra_info) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $_POST['title'],
                    $_POST['description'], 
                    $_POST['category'],
                    $_POST['color'],
                    $_POST['hover_color'],
                    $_POST['icon_class'],
                    $_POST['extra_info']
                ]);
                break;
                
            case 'edit':
                $stmt = $db->prepare("UPDATE services SET title=?, description=?, category=?, color=?, hover_color=?, icon_class=?, extra_info=? WHERE id=?");
                $stmt->execute([
                    $_POST['title'],
                    $_POST['description'],
                    $_POST['category'], 
                    $_POST['color'],
                    $_POST['hover_color'],
                    $_POST['icon_class'],
                    $_POST['extra_info'],
                    $_POST['id']
                ]);
                break;
                
            case 'delete':
                $stmt = $db->prepare("DELETE FROM services WHERE id=?");
                $stmt->execute([$_POST['id']]);
                break;
        }
    }
}

// Get all services
$services = $db->query("SELECT * FROM services ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services Management - ChillFizz Admin</title>
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
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .page-title {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1e293b;
            margin: 0;
        }

        .content-card {
            background: white;
            border-radius: 12px;
            box-shadow: var(--card-shadow);
            border: 1px solid var(--border-color);
            overflow: hidden;
        }

        .table-container {
            overflow-x: auto;
        }

        .table {
            margin: 0;
        }

        .table th {
            background-color: #f8fafc;
            border-bottom: 1px solid var(--border-color);
            font-weight: 600;
            color: #374151;
            font-size: 0.875rem;
            padding: 1rem;
        }

        .table td {
            padding: 1rem;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
        }

        .btn-primary {
            background-color: var(--primary-blue);
            border-color: var(--primary-blue);
            font-weight: 500;
        }

        .btn-primary:hover {
            background-color: #3730a3;
            border-color: #3730a3;
        }

        .btn-sm {
            padding: 0.375rem 0.75rem;
            font-size: 0.75rem;
        }

        .modal-header {
            border-bottom: 1px solid var(--border-color);
        }

        .modal-footer {
            border-top: 1px solid var(--border-color);
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
                <a class="nav-link" href="index.php">
                    <i class="fas fa-chart-pie"></i>
                    Overview
                </a>
            </div>
            <div class="nav-item">
                <a class="nav-link active" href="services.php">
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
            <h1 class="page-title">Services Management</h1>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#serviceModal" onclick="clearForm()">
                <i class="fas fa-plus me-2"></i>Add Service
            </button>
        </div>

        <div class="content-card">
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Icon</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($services as $service): ?>
                        <tr>
                            <td><?php echo $service['id']; ?></td>
                            <td><strong><?php echo htmlspecialchars($service['title']); ?></strong></td>
                            <td><span class="badge bg-secondary"><?php echo htmlspecialchars($service['category']); ?></span></td>
                            <td><?php echo htmlspecialchars(substr($service['description'], 0, 100)) . '...'; ?></td>
                            <td><i class="<?php echo htmlspecialchars($service['icon_class']); ?>"></i></td>
                            <td><?php echo $service['created_at'] ? date('M d, Y', strtotime($service['created_at'])) : 'N/A'; ?></td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary me-1" onclick="editService(<?php echo htmlspecialchars(json_encode($service)); ?>)">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <form method="POST" style="display: inline;" onsubmit="return confirm('Are you sure?')">
                                    <input type="hidden" name="action" value="delete">
                                    <input type="hidden" name="id" value="<?php echo $service['id']; ?>">
                                    <button type="submit" class="btn btn-sm btn-outline-danger">
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

    <!-- Service Modal -->
    <div class="modal fade" id="serviceModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <form method="POST">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle">Add Service</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="action" id="formAction" value="add">
                        <input type="hidden" name="id" id="serviceId">
                        
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-control" name="title" id="title" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Category</label>
                                <select class="form-control" name="category" id="category" required>
                                    <option value="products">Our Products</option>
                                    <option value="distribution">Distribution</option>
                                    <option value="custom">Custom Solutions</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" name="description" id="description" rows="3" required></textarea>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Icon Class</label>
                                <input type="text" class="form-control" name="icon_class" id="icon_class" placeholder="fa-leaf">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Color</label>
                                <input type="text" class="form-control" name="color" id="color" placeholder="linear-gradient(...)">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Hover Color</label>
                                <input type="text" class="form-control" name="hover_color" id="hover_color" placeholder="linear-gradient(...)">
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Extra Info (JSON)</label>
                            <textarea class="form-control" name="extra_info" id="extra_info" rows="2" placeholder='{"flavor": "Multiple", "coverage": "Nationwide"}'></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Service</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function clearForm() {
            document.getElementById('modalTitle').innerText = 'Add Service';
            document.getElementById('formAction').value = 'add';
            document.getElementById('serviceId').value = '';
            document.getElementById('title').value = '';
            document.getElementById('category').value = 'products';
            document.getElementById('description').value = '';
            document.getElementById('icon_class').value = '';
            document.getElementById('color').value = '';
            document.getElementById('hover_color').value = '';
            document.getElementById('extra_info').value = '';
        }

        function editService(service) {
            document.getElementById('modalTitle').innerText = 'Edit Service';
            document.getElementById('formAction').value = 'edit';
            document.getElementById('serviceId').value = service.id;
            document.getElementById('title').value = service.title;
            document.getElementById('category').value = service.category;
            document.getElementById('description').value = service.description;
            document.getElementById('icon_class').value = service.icon_class;
            document.getElementById('color').value = service.color;
            document.getElementById('hover_color').value = service.hover_color;
            document.getElementById('extra_info').value = service.extra_info;
            
            new bootstrap.Modal(document.getElementById('serviceModal')).show();
        }
    </script>
</body>
</html>
