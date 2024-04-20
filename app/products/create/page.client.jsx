'use client'

import { useState } from "react";
import { createProduct } from "./create"
import { useRouter } from 'next/navigation';

export default function CreateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const router = useRouter();

    const [errors, setErrors] = useState({});

    function navigateToProducts() {
        router.push('/products');
    }

    function saveProducts(event) {
        event.preventDefault();

        let errorList = {};

        if (!name) {
            errorList.name = "El nombre es obligatorio"; 
        }

        if (!price) {
            errorList.price = "El precio es obligatorio";
        } else if (!price.match("^[0-9]+$")) {
            errorList.price = "El precio debe ser un número";
        }

        if (!description) {
            errorList.description = "La descripción es obligatoria";
        }

        if (!category) {
            errorList.category = "Seleccione una categoría";
        }

        if (!stock) {
            errorList.stock = "Ingresa una cantidad";
        } else if (!stock.match("^[0-9]+$")) {
            errorList.stock = "La cantidad debe ser un número";
        }

        setErrors(errorList);

        if (Object.keys(errorList).length === 0) {
            // Aquí podrías enviar los datos al servidor
            console.log("Datos del formulario:", { name, price, description, category, stock });
        }

        createProduct({
            name,
            price,
            description,
            category,
            stock,
        })
        .then((result) => {
            //procesar resultado
            console.log(result);
            if (result.success) {
                setName('');
                setPrice('');
                setDescription('');
                setCategory('');
                setStock('');
            }
            alert(result.message);
        })
        .catch((error) => {
            console.log(error);
            alert(error.message);
        })
    }

    return (
        <div className="w-full">
            <div className="mt-4 ml-4">
                <button className="btn bg-gray-500 p-2 text-lg border rounded-lg bg-sky-500 rounded-lg shadow-lg"onClick={navigateToProducts}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                    </svg>
                </button>
            </div>

            <form className="flex flex-col gap-4 mt-8 max-w-xs mx-auto p-6 bg-violet-400 rounded-lg shadow-lg" onSubmit={saveProducts}>
                <h3 className="text-lg font-medium text-gray-900 text-center">Crear Producto</h3>
                <div className="flex flex-col">
                    <label className="text-gray-700">Nombre</label>
                    <input
                        name="name"
                        placeholder="Nombre de producto"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input text-black border border-gray-300 py3 px4 rounded-lg focus-border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                </div>
                
                <div className="flex flex-col">
                    <label className="text-gray-700">Precio</label>
                    <input
                        name="price"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="input text-black border border-gray-300 py3 px4 rounded-lg focus-border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.price && <span className="text-red-500">{errors.price}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700">Descripción</label>
                    <input
                        name="description"
                        placeholder="Descripción del producto"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input text-black border border-gray-300 py3 px4 rounded-lg focus-border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500" 
                    />
                    {errors.description && <span className="text-red-500">{errors.description}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700">Stock</label>
                    <input
                        name="stock"
                        placeholder="Cantidad"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="input text-black border border-gray-300 py3 px4 rounded-lg focus-border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500" 
                    />
                    {errors.stock && <span className="text-red-500">{errors.stock}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700">Categoría</label>
                    <select
                        className="input text-black border border-gray-300 py3 px4 rounded-lg focus-border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Amplificador">Amplificador</option>
                        <option value="Autotransformador">Autotransformador</option>
                        <option value="Fase">Checador de fase</option>
                    </select>
                    {errors.category && <span className="text-red-500">{errors.category}</span>}
                </div>

                <button type="submit" className="btn inline-block bg-blue-500 p-2 text-lg border rounded-lg bg-sky-500 rounded-lg shadow-lg max-w-max mx-auto">Registrar</button>
            </form>
        </div>

    );
}