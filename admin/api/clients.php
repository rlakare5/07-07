
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
        $stmt = $db->query("SELECT * FROM clients ORDER BY id");
        $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format for React component
        $formatted_clients = array_map(function($client) {
            return [
                'id' => (int)$client['id'],
                'brand' => $client['brand'],
                'sub' => $client['sub_brand'],
                'icon' => $client['icon_class']
            ];
        }, $clients);
        
        echo json_encode($formatted_clients);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
