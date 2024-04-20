"use client"

import { useState, useEffect } from 'react';
import { listarProductos } from '../listar';
import { updateProduct, deleteProduct } from './update';

export default function UpdateProductPage() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await listarProductos('');
        setProductos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    cargarProductos();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  
  const handleSaveProduct = async () => {
    try {
      const response = await updateProduct(selectedProduct);
      if (response.success) {
        alert(response.message); // Muestra una alerta de éxito
      } else {
        setError(response.message); // Muestra una alerta de error
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      setError('Error inesperado al actualizar el producto');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteProduct(productId);
      if (response.success) {
        alert(response.message)
        setProductos(productos.filter(producto => producto.id !== productId));
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      setError('Error inesperado al eliminar el producto');
    }
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-3xl text-center font-bold mb-4">Actualizar Productos</h1>
    <ul>
      {productos.map(producto => (
        <li key={producto.id} className="border-b border-gray-200 py-4">
          <p className="text-xl font-bold">Nombre: {producto.name}</p>
          <p className="text-blue-500">Precio: ${producto.price}</p>
          <p className="text-gray-600">Descripción: {producto.description}</p>
          <p className="text-blue-500">stock: ${producto.stock}</p>
          <p className="text-gray-500">Categoría: {producto.category}</p>
          <button onClick={() => handleOpenModal(producto)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mt-2 mx-5">Actualizar</button>
          <button onClick={() => handleDeleteProduct(producto.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">Borrar</button>
        </li>
      ))}
    </ul>

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900">Actualizar Producto</h3>
                {selectedProduct && (
                  <form>
                    <div className="mt-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                      <input type="text" id="name" value={selectedProduct.name} onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})} className="mt-1 p-1 border border-gray-300 rounded-md text-black" />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio:</label>
                      <input type="text" id="price" value={selectedProduct.price} onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})} className="mt-1 p-1 border border-gray-300 rounded-md text-black" />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                      <input type="text" id="description" value={selectedProduct.description} onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})} className="mt-1 p-1 border border-gray-300 rounded-md text-black" />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock:</label>
                      <input type="text" id="stock" value={selectedProduct.stock} onChange={(e) => setSelectedProduct({...selectedProduct, stock: e.target.value})} className="mt-1 p-1 border border-gray-300 rounded-md text-black" />
                    </div>
                    <div className="mt-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría:</label>
                    <select
                        id="category"
                        value={selectedProduct.category}
                        onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                        className="mt-1 p-1 border border-gray-300 rounded-md text-black">
                        <option value="">Selecciona una categoría</option>
                        <option value="Amplificador">Amplificador</option>
                        <option value="Autotransformador">Autotransformador</option>
                        <option value="Fase">Checador de fase</option>
                    </select>
                    </div>

                  </form>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mx-auto">
                <button onClick={handleCloseModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancelar
                </button>
                <button onClick={handleSaveProduct} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}