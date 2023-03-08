import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Button, Col, Container, Form, Row, Toast} from "react-bootstrap";
import axios from "axios";


const Detail = () => {
    const {a} = useParams()
    const productId = parseInt(a)
    const [product, setProduct] = useState([]);
    const [comments, setcomments] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch products from backend
        axios.post('http://localhost:8000/detail', {productId})
            .then(response => {
                setProduct(response.data.product);
                console.log(product);
                setcomments(response.data.comments);
                console.log(comments);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = () => {
        axios.get('http://localhost:8000/addComment')
            .then(response => {
                if (response.data.success) {
                    setMessage(response.data.message);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 800);
                    window.location.reload();
                }
            })
            .catch(error => {
                setMessage(error);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 800);
                console.log(error)
            });
    }

    return (
        <div>
            <h1>Detail</h1>
            <Container>
                <Row>
                    <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <img src={product.image_url} alt={product.image_url}/>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Stock: {product.stock}</p>
                        <p>Price: ${product.price}</p>
                    </Col>
                </Row>
                <Row>
                    <ul>
                        {comments.map(comment => (
                            <li>
                                <span>{comment.user.username}</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{comment.comment_time}</span>
                                <p>content：{comment.content}</p>
                            </li>
                        ))
                        }
                    </ul>
                </Row>
            </Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Write your comment</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>
            {showToast && (
                <Toast style={{position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            )}

        </div>
    );
}

export default Detail;