import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterCategory, filterProduct, getProduct } from '../store/slices/product.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, FormControl, InputGroup, Button, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ search, setSearch ] = useState("");
    const [ categories, setCategories ] = useState([]);

    const product = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProduct());
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories));
    }, [dispatch]);

    const filterSearch = () => {
        dispatch(filterProduct(search));
    }

    const selectCategory = id => {
        dispatch(filterCategory(id));
    }

    return (
        <div>
            <h1> </h1>
            <Row className="g-4">
                <Col lg={3} className="mb-4">
                    <ListGroup>
                        { categories.map(category => (
                            <ListGroup.Item key={category.id} onClick={() => selectCategory(category.id)}>
                                {category.name}
                            </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder=" Search..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={filterSearch}>
                    Button
                    </Button>
                </InputGroup>
                <Row xs={3} md={3} className="g-4">
                    {product.map(productItem => (
                    <Col key={productItem.id}>
                        <Card style={{cursor: "pointer", width: '15rem'}} onClick={() => navigate(`/product/${productItem.id}`)} >
                            <img src={productItem.productImgs[1]} className="img-fluid" alt=""/>
                            <Card.Body>
                            <Card.Title>{productItem.title}</Card.Title>
                            <Card.Text>
                                Price : $ {productItem.price}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;