"use server"

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function saveNewPassword(password) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    // Validar contraseña en el servidor
    let errorList = {};

    if (!password) {
        errorList.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
        errorList.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.keys(errorList).length > 0) {
        return {
            success: false,
            message: "Error al cambiar la contraseña",
            errors: errorList,
        };
    }
    
    const { data, error } = await supabase.auth.updateUser({ password: password });

    if (error) {
        return {
            success: false,
            message: `No se puede guardar la nueva contraseña: ${error.message}`,
            errors: null,
        };
    }

    return {
        success: true,
        message: "La contraseña ha sido actualizada.",
        errors: null,
    };
}
