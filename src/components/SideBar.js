import React from 'react';
import { Offcanvas, ListGroup, Badge, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkout } from '../store/slices/cart.slice';


const SideBar = ({show, handleClose}) => {

    const cartProducts = useSelector(state => state.cart.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectItem = (cartProduct) => {
        handleClose();
        navigate(`/product/${cartProduct.id}`);
    }

    

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup as="ol" numbered>
                        {cartProducts?.map(cartProduct => (
                            <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            onClick={() => selectItem(cartProduct)}
                        >
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">{cartProduct.title}</div>
                            $ {cartProduct.price}
                            </div>
                            <Badge bg="primary" pill>
                            {cartProduct.productsInCart.quantity}
                            </Badge>
                        </ListGroup.Item>                        
                        ))}
                        
                    </ListGroup>
                    <Button variant="primary" size="lg" onClick={() => dispatch(checkout())}>
                        Checkout
                    </Button>
            </Offcanvas.Body>
            </Offcanvas>
            
        </div>
    );
};

export default SideBar;