import React from 'react';
import axios from 'axios';

function Checkout({ onCheckout }) {
    const handleCheckout = async () => {
        try {
            const order = {
                items: [
                    { id: 1, quantity: 2 },
                    { id: 2, quantity: 1 },
                ],
            };

            const response = await axios.post('http://127.0.0.1:4000/checkout', order);

            if (response.data.success) {
                alert('Compra finalizada com sucesso!');
            } else {
                alert('Erro ao finalizar compra. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            alert('Erro ao finalizar compra. Tente novamente.');
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <button onClick={handleCheckout}>Finalizar Compra</button>
        </div>
    );
}

export default Checkout;
