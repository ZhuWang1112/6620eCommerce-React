import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/cart')
            .then(response => {
                if (response.data.success) {
                    setCartItems(response.data.cart_items.map(item => ({
                        ...item,
                        quantity: parseInt(item.quantity),
                        total_price: parseFloat(item.total_price),
                        product: {
                            ...item.product,
                            id: parseInt(item.product.id),
                            price: parseFloat(item.product.price),
                            stock: parseInt(item.product.stock)
                        }
                    })));
                    setCartTotal(parseFloat(response.data.cart_total));
                } else {
                    alert(response.data.error);
                }
            })
            .catch(error => console.log(error));
    }, []);

    const handleAddItem = (productId, productPrice) => {
        axios.post('http://localhost:8000/cart/modify', {productId})
            .then(response => {
                if (response.data.success) {
                    setCartItems(prevItems => {
                        return prevItems.map(item => {
                            if (item.product.id === productId) {
                                return {
                                    ...item,
                                    quantity: item.quantity + 1,
                                    total_price: item.total_price + item.product.price
                                };
                            } else {
                                return item;
                            }
                        });
                    });
                    setCartTotal(prevTotal => prevTotal + productPrice);
                } else {
                    alert(response.data.error);
                }
            })
            .catch(error => console.log(error));
    };

    const handleReduceItem = (productId, productPrice) => {
        axios.put('http://localhost:8000/cart/modify', {productId})
            .then(response => {
                if (response.data.success) {
                    setCartItems(prevItems => {
                        return prevItems.map(item => {
                            if (item.product.id === productId) {
                                const updatedItem = {
                                    ...item,
                                    quantity: item.quantity - 1,
                                    total_price: item.total_price - item.product.price
                                };
                                if (updatedItem.quantity > 0) {
                                    return updatedItem;
                                } else {
                                    return null;
                                }
                            } else {
                                return item;
                            }
                        }).filter(item => item !== null);
                    });
                    setCartTotal(prevTotal => prevTotal - productPrice);
                } else {
                    alert(response.data.error);
                }
            })
            .catch(error => console.log(error));
    };

    const handleDeleteItem = (productId, productTotalPrice) => {
        axios.delete('http://localhost:8000/cart/modify', {data: {productId}})
            .then(response => {
                if (response.data.success) {
                    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
                    setCartTotal(prevTotal => prevTotal - productTotalPrice);
                } else {
                    alert(response.data.error);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <table className={"table"}>
                <thead>
                <tr className={"table-danger"}>
                    <th>Product</th>
                    <th>ProductImage</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map(item => (
                    <tr key={item.id} className={"table-active"}>
                        <td>{item.product.name}</td>
                        <td><img src={item.product.image_url} alt={item.product.name}/></td>
                        <td>{item.quantity}</td>
                        <td>{item.product.price}</td>
                        <td>{item.total_price.toFixed(2)}</td>
                        <td>
                            <button onClick={() => handleAddItem(item.product.id, item.product.price)}>+</button>
                            <button onClick={() => handleReduceItem(item.product.id, item.product.price)}>-</button>
                            <button onClick={() => handleDeleteItem(item.product.id, item.total_price)}>x</button>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr className="table-success">
                    <td colSpan="4">Total:</td>
                    <td>{cartTotal.toFixed(2)}</td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
            <Link to={"../home"}>Continue Shopping</Link>
        </div>
    );
}

export default Cart;
