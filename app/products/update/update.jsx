"use server"

import { createClient } from '@/utils/supabase/server';

export async function updateProduct(product) {
  const supabase = createClient(); // Crear cliente Supabase
  try {
    // Actualizar el producto en la base de datos utilizando Supabase
    const { data, error } = await supabase
      .from('audio')
      .update(product) // Actualizar con los datos del producto recibido
      .eq('id', product.id) // Filtro para actualizar solo el producto con el ID correspondiente
      .single(); // Solo necesitamos un registro actualizado

    if (error) {
      throw error;
    }

    return { success: true, message: 'Producto actualizado exitosamente' };
  } catch (error) {
    return { success: false, message: 'Error al actualizar el producto en la base de datos', error };
  }
}

export async function deleteProduct(productId) {
    const supabase = createClient(); // Crear cliente Supabase
    try {
      // Eliminar el producto de la base de datos utilizando Supabase
      const { error } = await supabase
        .from('audio')
        .delete()
        .eq('id', productId); // Filtrar para eliminar solo el producto con el ID correspondiente
  
      if (error) {
        throw error;
      }
  
      return { success: true, message: 'Producto eliminado exitosamente' };
    } catch (error) {
      return { success: false, message: 'Error al eliminar el producto de la base de datos', error };
    }
  }