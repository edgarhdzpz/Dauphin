//generar un slider de targetas
"use client"
// import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Slider from "../../../components/Slider";
import { getProductById } from "../listar";

export default function SliderPage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProductById();
                setProducts(productsData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    //funcion que genera un producto de una targeta
    const productCard = (product, index) => (
        <div
         key={product.id}        
         className={`w-[200px] h-[250px] bg-slate-200 p-2 border 1 rounded rounded-lg text-black`}
         >
         {/* Mostrar solo la primera imagen de la galería */}
         {product.gallery && product.gallery.length > 0 && (
             <img src={product.gallery[0].original} alt={product.name} style={{ maxWidth: '100%', maxHeight: '1o0%' }} />
         )}
         <p>{product.name}</p>
         <p>{product.price}</p>
        </div>
    )

    const productCard2 = (product, index) => (
        <div
         key={product.id}        
         className={`w-[200px] h-[270px] bg-slate-400 p-2 border 1 rounded rounded-lg text-black`}
         >
         <p className="text-xl font-bold">{product.name}</p>
        </div>
    )

    return(
        <div className="p-2 w-full">
            <h1 className="text-xl font-bold mb-3">Slider de tarjetas</h1>
            
            <Slider
              height={270}
              cardWidth={200}
              items={products.map((product) => productCard(product))}
              className="my-6 mx4">
            </Slider>

            <Slider
              height={250}
              cardWidth={200}
              items={products.map((product) => productCard2(product))}
              className="my-6 mx4">
            </Slider>
        </div>
    )
}