import pika
import json
import time

max_retries = 5
retry_delay = 5

def establish_connection(max_retries, retry_delay):
    for i in range(max_retries):
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
            return connection
        except pika.exceptions.AMQPConnectionError:
            if i < max_retries - 1:
                time.sleep(retry_delay)
            else:
                raise

def process_payment(order):
    print(f"Processando pagamento para o pedido: {order['order_id']}")
    return True

def callback(ch, method, properties, body):
    order = json.loads(body)
    success = process_payment(order)
    
    payment_event = json.dumps({
        'order_id': order['order_id'],
        'status': 'processed' if success else 'failed'
    })
    
    try:
        channel.basic_publish(exchange='', routing_key='payment_processed', body=payment_event)
        print(f"Pagamento {'sucesso' if success else 'falha'} para o pedido: {order['order_id']}")
    except pika.exceptions.AMQPError as e:
        print(f"Erro ao publicar mensagem: {str(e)}")

def setup_channel(connection):
    channel = connection.channel()
    channel.queue_declare(queue='stock_updated')
    channel.queue_declare(queue='payment_processed')
    channel.basic_consume(queue='stock_updated', on_message_callback=callback, auto_ack=True)
    return channel

if __name__ == "__main__":
    connection = establish_connection(max_retries, retry_delay)
    channel = setup_channel(connection)
    print('Aguardando eventos de atualização de estoque...')
    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        print('Interrompido pelo usuário')
    finally:
        if connection:
            connection.close()
