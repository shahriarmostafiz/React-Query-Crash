import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const AddProducts = () => {
    const queryClient = useQueryClient()
    const [state, setState] = useState({
        title: "",
        description: "",
        price: 0,
        rating: 5,
        thumbnail: "",

    })
    const mutation = useMutation({
        mutationFn: (np) => axios.post(`http://localhost:3000/products`, np),
        onSuccess: (data, variables, context) => {
            console.log(context);
            queryClient.invalidateQueries(["products"])
        },
        onMutate: () => {
            return { name: "shahriar" }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state);
        const newState = {
            ...state,
            id: crypto.randomUUID().toString()
        }
        mutation.mutate(newState)
    }
    const handleChange = e => {
        const name = e.target.name
        const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value
        setState({
            ...state,
            [name]: value
        })
    }

    mutation.isLoading && <div>loading... </div>
    return (
        <div className='w-1/5 m-2 p-2 bg-gray-100 h-1/2 rounded-t'>
            <h1 className="text-2xl my-2">
                Add a Product
            </h1>
            {mutation.isSuccess && <div>Product added successfully... </div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2">
                <input type="text" name="title" onChange={handleChange} value={state.title} id="" className='my-2 p-2 rounded' placeholder='Enter the product title' />
                <textarea type="text" name="description" id="" onChange={handleChange} value={state.description} className='my-2 p-2 rounded' placeholder='Enter the product description' />
                <input type="number" name="price" onChange={handleChange} id="" value={state.price} className='my-2 p-2 rounded' placeholder='Enter the product price' />
                <input type="text" name="thumbnail" onChange={handleChange} id="" value={state.thumbnail} className='my-2 p-2 rounded' placeholder='Enter the product thumbnail' />
                {/* <input type="text" name="rating" id=""  className='my-2 p-2 rounded' placeholder='Enter the rating'/> */}
                <button type='submit' className='bg-gray-400 hover:bg-slate-600 border rounded-md text-xl px-4 py-1 text-white '> Add
                </button>
            </form>
        </div>
    );
};

export default AddProducts;