import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Toast, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";



function Home() {
    const [products, setProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch products from backend
        axios.get('http://localhost:8000/home')
            .then(response => {
                setProducts(response.data.data.map(item => ({
                    ...item,
                    stock: parseInt(item.stock),
                })));
                console.log(products);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const addToCart = (productId) => {
        axios.post('http://localhost:8000/cart/modify', {productId})
            .then(response => {
                if (response.data.success) {
                    setProducts(products.map(product => {
                        if (product.id === productId) {
                            return {
                                ...product,
                                stock: product.stock - 1,
                            };
                        } else {
                            return product;
                        }
                    }));
                    setMessage(response.data.message);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 800);
                } else {
                    alert(response.data.error);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Products</h1>
            <Container>
                <Row>
                    {products.map(product => (
                        <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <img src={product.image_url} alt={product.name}/>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Price: ${product.price}</p>
                            <Link to={{pathname: `/store/product/${product.id}`, state:{product}}}>
                                <button>Detail</button>
                            </Link>
                            <button onClick={() => addToCart(product.id)}>Add to cart</button>
                        </Col>
                    ))}
                </Row>
            </Container>
            {showToast && (
                <Toast style={{position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            )}

        </div>
    );
}

export default Home;
