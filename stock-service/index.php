<?php
require __DIR__ . '/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $order = json_decode(file_get_contents('php://input'), true);

    $success = true; 

    $connection = new AMQPStreamConnection('rabbitmq', 5672, 'guest', 'guest');
    $channel = $connection->channel();

    $channel->queue_declare('stock_updated', false, false, false, false);

    $msg = new AMQPMessage(json_encode([
        'order_id' => 1,
        'status' => 'updated'
    ]));

    $channel->basic_publish($msg, '', 'stock_updated');

    $channel->close();
    $connection->close();

    header('Content-Type: application/json');
    echo json_encode(['success' => $success]);
}
