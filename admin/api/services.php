
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
        $stmt = $db->query("SELECT * FROM services ORDER BY id");
        $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format for React component
        $formatted_services = array_map(function($service) {
            return [
                'id' => (int)$service['id'],
                'title' => $service['title'],
                'description' => $service['description'],
                'category' => $service['category'],
                'color' => $service['color'],
                'hoverColor' => $service['hover_color'],
                'icon' => $service['icon_class'],
                'extraInfo' => $service['extra_info']
            ];
        }, $services);
        
        echo json_encode($formatted_services);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
