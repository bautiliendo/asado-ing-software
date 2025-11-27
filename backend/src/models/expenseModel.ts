import { supabase } from '../config/supabase';

export interface Expense {
    id?: number;
    event_id: number;
    guest_id?: number;
    description: string;
    amount: number;
}

export const getExpenses = async () => {
    const { data, error } = await supabase
        .from('expenses')
        .select('*');

    if (error) throw error;
    return data;
};

export const getExpensesByEventId = async (eventId: number) => {
    console.log('🗄️ Modelo - Consultando gastos para event_id:', eventId);
    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('event_id', eventId);

    if (error) {
        console.error('❌ Error en Supabase:', error);
        throw error;
    }
    console.log('✅ Datos de Supabase:', data);
    return data;
};

export const getExpenseById = async (id: number) => {
    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const createExpense = async (expense: Expense) => {
    const { data, error } = await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateExpense = async (id: number, expense: Partial<Expense>) => {
    const { data, error } = await supabase
        .from('expenses')
        .update(expense)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deleteExpense = async (id: number) => {
    const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
};
