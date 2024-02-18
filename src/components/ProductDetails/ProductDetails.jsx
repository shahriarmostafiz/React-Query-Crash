import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
const getDetails = async ({ querykey }) => {
    // console.log(obj);
    const res = await axios.get(`http://localhost:3000/${querykey[0]}/${querykey[1]}`)
    return res.data

}
const ProductDetails = ({ id }) => {
    const { data: product, isPending, error } = useQuery({
        queryKey: ["products", id],
        queryFn: getDetails
    })
    isPending && <div>fetching details ...</div>
    error && <div>Something went wrong, {error.message}</div>
    return (
        <div>
            <h1 className='text-3xl my-2'>Product Details </h1>
            <h2>{product?.title}</h2>

        </div>
    );
};

export default ProductDetails;