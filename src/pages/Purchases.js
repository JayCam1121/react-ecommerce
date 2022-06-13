import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchases());
    }, [dispatch])

    const options = {year: 'numeric', month: 'long', day: 'numeric'};

    return (
        <section className='purchases content'>
            <article className='content-purchases'>
                <h2 className='purchases-title'>Purchases History</h2>
                <ListGroup as="ol" numbered>
                    {
                        purchases.map(purchase => (
                            <ListGroupItem className='item-products' >
                                <h4 className='products-title'>
                                    {
                                        new Date(purchase.createdAt).toLocaleDateString(undefined, options)
                                    }
                                </h4>
                                {
                                    purchase.cart.products.map(product => (
                                        <div className='product' onClick={() => navigate(`/product/${product.id}`)} key={product.id}>
                                            <p className='prod-title'><h5><b>{product.title}</b></h5></p>
                                            <p className='prod-quantity'><b>Quantity:</b> {product.productsInCart.quantity}</p>
                                            <p className='prod-price'>$ {product.price}</p>
                                        </div>
                                    ))
                                }
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </article>
        </section>
    );
};

export default Purchases;