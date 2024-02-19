import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { IdContext } from '../../IdContextProvder';

const ProductList = () => {
    const { id, setId } = useContext(IdContext)
    const queryClient = useQueryClient()
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

    const mutation = useMutation({
        mutationFn: id => axios.delete(`http://localhost:3000/products/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["products"])
        }
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

    const handleDelete = id => {
        mutation.mutate(id)
    }
    // mutation.isSuccess && alert("Product was deleted ")
    // console.log(products);
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
                            <div className="flex justify-between w-full px-4 items-center   ">
                                <p className='text-3xl my-3 cursor-pointer hover:text-green-600' onClick={() => setId(product.id)}>
                                    {
                                        product.title
                                    }
                                </p>
                                <button className='text-white bg-red-500 px-2 text-xs py-1 hover:bg-red-600  rounded' onClick={() => handleDelete(product.id)}>Delete  </button>
                            </div>

                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductList;