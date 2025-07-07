
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
        $stmt = $db->query("SELECT * FROM employee_reviews ORDER BY id");
        $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format for React component
        $formatted_reviews = array_map(function($review) {
            return [
                'id' => (int)$review['id'],
                'name' => $review['name'],
                'image' => $review['image_url'],
                'text' => $review['review_text'],
                'className' => $review['card_class'],
                'cardStyle' => [
                    'background' => $review['background_color'],
                    'transform' => $review['rotation']
                ]
            ];
        }, $reviews);
        
        echo json_encode($formatted_reviews);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
