import { supabase } from '../config/supabase';

export interface Guest {
    id?: number;
    name: string;
    alias?: string;
}

export const getGuests = async () => {
    const { data, error } = await supabase
        .from('guests')
        .select('*');

    if (error) throw error;
    return data;
};

export const getGuestById = async (id: number) => {
    const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const createGuest = async (guest: Guest) => {
    const { data, error } = await supabase
        .from('guests')
        .insert([guest])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateGuest = async (id: number, guest: Partial<Guest>) => {
    const { data, error } = await supabase
        .from('guests')
        .update(guest)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deleteGuest = async (id: number) => {
    // Primero eliminar los gastos asociados al invitado
    const { error: expenseError } = await supabase
        .from('expenses')
        .delete()
        .eq('guest_id', id);

    if (expenseError) throw expenseError;

    // Luego eliminar al invitado
    const { error } = await supabase
        .from('guests')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
};
