//page.jsx
'use client'

import { useState, useEffect } from 'react';
import { getProductById, listarProductos, signOutAndRedirect } from './listar';
import { useRouter } from 'next/navigation';
import Slider from '@/components/Slider';
import { createClient } from '@/utils/supabase/client'

export default function ListarProductos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');
  const supabase = createClient()
  const router = useRouter();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await listarProductos(searchTerm);
      setProductos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  function navigateToCreateProductPage() {
    router.push('products/create');
  }
  function navigateToUpdateProductPage() {
    router.push('products/update');
  }
  const handleProductClick = (producto) => {
    router.push(`/products/${producto.id}`); // Redirección a la ruta dinámica
  };


  const handleSignOut = async () => {
    await signOutAndRedirect();
    // Redirigir a la página de inicio de sesión u otra página deseada después de cerrar sesión
    // Ejemplo:
    router.push("/login");
  };

  useEffect(() => {
    const cargarProductos = async () => {
      // verificar si tiene sesion iniciada
      const { data: { session } } = await supabase.auth.getSession();

      //si no hay sesion 
      if(!session) {
        //redireccionarlo a login
        router.push('/login');
      }
      if (session) {
        setUserName(session.user.email);
      }


      try {
        const data = await listarProductos('');
        setProductos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    cargarProductos();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      className={`w-[200px] h-[250px] bg-blue-400 p-2 border 1 rounded rounded-lg text-black`}
    >
      {/* Mostrar solo la primera imagen de la galería */}
      {product.gallery && product.gallery.length > 0 && (
        <img src={product.gallery[0].original} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', height: '80%' }} />
      )}
      <p className="text-sm font-bold">Nombre: {product.name}</p>
      <p className='text-base font-bold text-gray-900 dark:text-white'>${product.price}</p>
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <p className='text-white'>Hey {userName} welcome</p>
          <button className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover' onClick={handleSignOut}>LogOut</button>
        </div>
      </nav>

      <form onSubmit={handleSearchSubmit} className="flex items-center justify-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={navigateToCreateProductPage}>
          Crear Producto
        </button>
        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={navigateToUpdateProductPage}>
          Actualizar Producto
        </button>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="ml-2 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Buscar
        </button>
      </form>

      <div className="p-2 m-auto w-1/2">
        <h1 className="text-xl font-bold mb-3 text-center">The best products</h1>

        <Slider
          height={270}
          cardWidth={200}
          items={products.map((product) => productCard(product))}
          className="my-6 mx4">
        </Slider>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center">Lista de Productos</h1>

      <div className='flex items-center justify-center mb-4 m-auto w-1/2'>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id} className="border-b border-gray-200 py-2" onClick={() => handleProductClick(producto)}>
              <p className="font-bold">Nombre: {producto.name}</p>
              <p className="text-blue-500">Precio: ${producto.price}</p>
              <p className="text-gray-600">Descripción: {producto.description}</p>
              <p className="text-blue-500">stock: {producto.stock}</p>
              <p className="text-gray-500">Categoría: {producto.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}