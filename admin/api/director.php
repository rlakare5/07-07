
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $db->query("SELECT * FROM director_message ORDER BY id DESC LIMIT 1");
        $message = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($message) {
            echo json_encode($message);
        } else {
            // Return default message if none exists
            echo json_encode([
                'id' => 0,
                'title' => 'Welcome to ChillFizz',
                'message' => 'At ChillFizz, we believe that every sip should be a moment of pure refreshment and joy. Our commitment to quality and innovation drives us to create the most delicious and nutritious beverages for our valued customers.',
                'director_name' => 'Aryan Vaidya',
                'director_position' => 'Director & Founder'
            ]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
