import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const ProductList = () => {

    const retrieveList = async ({ queryKey }) => {
        // console.log(obj);
        const res = await axios.get(`http://localhost:3000/${queryKey[0]}`)
        return res.data

    }
    const { data: products, isPending, isLoading, error, refetch } = useQuery({
        queryKey: ["products"], // ekhaner ei name er upor depend kore react query ekta cached entry banabe 
        queryFn: retrieveList,
        retry: false,
        staleTime: 10000
    })

    if (isPending) {
        return <div>
            Loading data
        </div>
    }
    if (error) {
        return <div>
            an error has occurred.... {error.message}
        </div>
    }
    console.log(products);
    return (
        <div className='flex flex-col justify-center items-center w-3/5'>
            <h2 className='text-3xl my-2'>
                Product List
            </h2>
            <ul className='flex flex-wrap justify-center items-center'>
                {
                    products?.map(product => (
                        <li key={product.id} className=' flex flex-col m-2 items-center  border rounded-sm '>
                            <img src={product.thumbnail} alt="" className=' object-cover h-64 w-96 rounded' />
                            <p className='text-3xl my-3'>
                                {
                                    product.title
                                }
                            </p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductList;