//listar.jsx
"use server"

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function signOutAndRedirect() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function listarProductos(busqueda) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    try {
        let query = supabase.from('audio').select('*');
      
        // Aplicar búsqueda si se proporciona
        if (busqueda) {
            query = query.or(`name.ilike.%${busqueda}%,description.ilike.%${busqueda}%,category.ilike.%${busqueda}%`);
        }
      
        const { data, error } = await query;
      
        if (error) {
            throw new Error('Error al obtener los productos');
        }
      
        return data;
    } catch (error) {
        throw new Error('Error al obtener los productos');
    }
}

// Exporta la función getImages
export async function getImages(productId) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase
      .from('audio')
      .select('*')
      .eq('id', productId)
      .single();
  
    if (error) {
      throw new Error('Error al obtener las imágenes del producto');
    }
  
    return data.gallery;
}

export async function getProductById() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase
      .from('audio')
      .select('*');
  
    if (error) {
      throw new Error('Error al obtener el producto');
    }
  
    return data;
}
  