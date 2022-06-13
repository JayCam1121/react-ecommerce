import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        setProduct: (state, action) => {
            return action.payload
        }
    }
})

export const { setProduct } = productSlice.actions;

export const getProduct = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
        .then(res => dispatch(setProduct(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false))); 
}

export const filterProduct = (query) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${query}`)
        .then(res => dispatch(setProduct(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false))); 
}

export const filterCategory = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
        .then(res => dispatch(setProduct(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false))); 
}

export default productSlice.reducer;