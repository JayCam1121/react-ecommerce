import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { getCart } from '../store/slices/cart.slice';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

const NarBar = () => {

    const logout = () => localStorage.setItem("token", "")

    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => {

        const token = localStorage.getItem("token");

        if(token){
            setShow(true)
        } else {
            navigate("/login")
        }
        
    };


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch]);

    return (
        <div>
            <Navbar sticky="top" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/"><h1>E-Commerce</h1></Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse id="basic-navbar-nav" className="d-flex">
                            <Nav className="me-auto">
                                <Nav.Link href="/#/login"><h2><i class="fa-solid fa-user-tie"></i></h2></Nav.Link>
                                <Nav.Link href="/#/purchases"><h2><i class="fa-solid fa-store"></i></h2></Nav.Link>
                                <Nav.Link role="button" onClick={handleShow}><h2><i class="fa-solid fa-cart-shopping"></i></h2></Nav.Link>
                                <Nav.Link role="button" onClick={logout}><h2><i class="fa-solid fa-right-from-bracket"></i></h2></Nav.Link>
                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <SideBar show={show} handleClose={handleClose}/>s
            
        </div>
    );
};

export default NarBar;