import { supabase } from '../config/supabase';

export interface Event {
    id?: number;
    name: string;
    date: string;
    location: string;
    description?: string;
}

export const getEvents = async () => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    if (error) throw error;
    return data;
};

export const getEventById = async (id: number) => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const createEvent = async (event: Event) => {
    const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateEvent = async (id: number, event: Partial<Event>) => {
    const { data, error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deleteEvent = async (id: number) => {
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
};
