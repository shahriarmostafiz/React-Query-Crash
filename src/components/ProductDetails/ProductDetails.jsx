import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { IdContext } from '../../IdContextProvder';
const getDetails = async ({ queryKey }) => {
    // console.log(obj);
    const res = await axios.get(`http://localhost:3000/${queryKey[0]}/${queryKey[1]}`)
    // console.log(res.data);
    return res.data

}
const ProductDetails = () => {
    // const id = 1
    const { id } = useContext(IdContext)
    const { data: product, isPending, error } = useQuery({
        queryKey: ["products", id],
        queryFn: getDetails
    })
    isPending && <div>fetching details ...</div>
    error && <div>Something went wrong, {error.message}</div>
    // console.log(product);
    return (
        <div className='w-1/5'>
            <h1 className='text-3xl my-2'>Product Details </h1>

            <div className="border bg-gray-100 px-4 py-6 text-md rounded  flex flex-col space-y-4 ">

                <img src={product?.thumbnail} alt="" className='w-24 h-24 rounded-full border m-auto' />
                <h2>{product?.title}</h2>
                <p>{product?.description}</p>
                <div className="flex gap-5">
                    <p>Price:  $ {product?.price}</p>
                    <p> Rating:   {product?.rating}</p>
                </div>
            </div>



        </div>
    );
};

export default ProductDetails;