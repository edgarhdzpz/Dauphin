// ProductPage.jsx
'use client'

import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { getImages, getProductById } from '../listar';
import { useRouter } from 'next/navigation';

import 'react-image-gallery/styles/css/image-gallery.css';
import Slider from '@/components/Slider';

export default function ProductPage({ params }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImages(params.id);
      setImages(images.map(image => ({ ...image, original: image.thumbnail }))); // Utilizar la versión en miniatura como original
    };

    fetchImages();
  }, [params.id]);

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

  const productCard = (product, index) => (
    <div
     key={product.id}        
     className={`w-[200px] h-[250px] bg-blue-400 p-2 border 1 rounded rounded-lg text-black`}
     >
     {/* Mostrar solo la primera imagen de la galería */}
     {product.gallery && product.gallery.length > 0 && (
        <img src={product.gallery[0].original} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', height:'80%'}} />
     )}
     <p className="text-sm font-bold">Nombre: {product.name}</p>
     <p className='text-base font-bold text-gray-900 dark:text-white'>${product.price}</p>
    </div>
  )

  function navigateToProducts() {
    router.push('/products');
  }

  return (
    <div className="w-full">
        <div className="mt-4 ml-4">
            <button className="btn bg-gray-500 p-2 text-lg border rounded-lg bg-sky-500 rounded-lg shadow-lg"onClick={navigateToProducts}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                </svg>
            </button>
        </div>
        <p class="text-2xl text-center font-semibold text-white">Información detallada de producto</p>

      <div className="flex justify-center items-center w-1/3 m-auto">
        
        <ImageGallery items={images} className="w-1/2" />
        
      </div>

      <div className="p-2 m-auto lg:w-1/2 w-full">
            <h1 className="text-xl font-bold mb-3 text-center">Same products</h1>
            
            <Slider
              height={270}
              cardWidth={200}
              items={products.map((product) => productCard(product))}
              className="my-6 mx4">
            </Slider>
      </div>
    </div>
  );
}
