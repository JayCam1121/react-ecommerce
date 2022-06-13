import {createSlice} from '@reduxjs/toolkit'
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import { getPurchases } from './purchases.slice';

export const cartSlice = createSlice ({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const {setCart} = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCart = (myCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", myCart, getConfig())
    .then(() => {
        dispatch(getCart());
        alert("You added the product to your cart")
    })
    .catch(error => console.log(error.response))
    .finally(() => dispatch(setIsLoading(false)));
}

export const checkout = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => {
            dispatch(getPurchases());
            dispatch(setCart([]));
        })
        .finally(() => dispatch(setIsLoading(false)));
} 

export default cartSlice.reducer;