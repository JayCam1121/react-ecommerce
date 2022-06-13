import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { filterProduct } from '../store/slices/product.slice';
import { Card, Row, Col, Button, Container, Stack } from 'react-bootstrap';
import { addToCart } from '../store/slices/cart.slice';

const ProductDetail = () => {

const [ product, setProduct ] = useState({})

const { id } = useParams();

const dispatch = useDispatch();
const navigate = useNavigate();

const products = useSelector(state => state.product);

useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
          .then( res => {
            const productList = res.data.data.products.find(productItem => productItem.id === Number(id));
            setProduct(productList)
            dispatch(filterProduct(productList.category?.id));
          })
}, [dispatch, id]);

const [ quantity, setQuantity ] = useState(1);

const increment = () => {
  setQuantity(quantity + 1);
}

const decrement = () => {
  if(quantity > 1) {
    setQuantity(quantity - 1);
  }
}

const addCart = () => {
  const myCart = {
    id,
    quantity
  }
  dispatch(addToCart(myCart));
}

    return (
        <div>
          <Stack gap={2}>
            <Container>
              <Row xs={1} md={2}className="g-4">
                <Col>
                  <Card>
                    <Card.Body>
                    <div>
                      <h1>{product.title}</h1>
                      <img src={product.productImgs} alt={product.title}/>
                    </div>
                    </Card.Body>
                  </Card>
                    
                </Col>
                <Col>
                  <Card style={{maxWidth: "400px"}}>
                    <Card.Body>
                        <div>
                          <p>{product.description}</p>
                          <h2>Price: {product.price}</h2>
                          <div className='quantity'>
                            <h4>Quantity</h4>
                            <Button variant="primary" size="sm" onClick={decrement}><i class="fa-solid fa-minus"></i></Button>
                            <input type="text" value={quantity} />
                            <Button variant="primary" size="sm" onClick={increment}><i class="fa-solid fa-plus"></i></Button>
                          </div>
                          <Button variant="secondary" size="lg" onClick={addCart}>
                            Add to Cart <i class="fa-solid fa-cart-shopping"></i>
                          </Button>
                        </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
                <Container>
                <h1>Discover similar items</h1>   
                  <Row xs={3} md={3} className="g-4">  
                    {products.map(productItem => (
                      <Card style={{cursor: "pointer", width: '25rem', height: '30rem' }} onClick={() => navigate(`/product/${productItem.id}`)}>
                          <Card.Img variant="top" src={productItem.productImgs[0]}  />
                            <Card.Body>
                              <Card.Title>{productItem.title}</Card.Title>
                              <Card.Text>Price: {productItem.price}</Card.Text>
                            </Card.Body>
                      </Card>
                      ))
                    }
                  </Row>
                </Container> 
            </Stack>
        </div>
    );
};

export default ProductDetail;