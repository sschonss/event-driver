import React from 'react';

const products = [
    { id: 1, name: 'Produto A', price: 100 },
    { id: 2, name: 'Produto B', price: 150 },
    { id: 3, name: 'Produto C', price: 200 },
];

function ProductList({ addToCart }) {
    return (
        <div>
            <h1>Produtos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
