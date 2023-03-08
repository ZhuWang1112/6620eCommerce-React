import React, {useEffect, useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import {Navigate} from "react-router";

function Navi() {
    const [loggedIn, setLoggedIn] = useState(false);
    const username = localStorage.getItem('username');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/checklogin',)
            .then(response => {
                setLoggedIn(response.data.success);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // console.log(loggedIn);
    const logout = () => {
        axios.get('http://localhost:8000/log_out')
            .then(response => {
                if (response.data.success) {
                    setShouldRedirect(true);
                }
            })
            .catch(error => console.log(error));
    }

    if (shouldRedirect) {
        return <Navigate to='/'/>
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href={"/store/home"}>My Store</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/store/home">Home</Link>
                {loggedIn && (
                    <Link to="/store/cart">My Cart</Link>
                )}
            </Nav>
            <Nav className="ms-auto">
                {loggedIn
                    ? (<div className="text-success">
                        Welcome, {username}
                        <button onClick={logout}> Logout</button>
                    </div>)
                    : <Link to="/">Log in</Link>
                }
            </Nav>
        </Navbar>
    );
}

export default Navi;
