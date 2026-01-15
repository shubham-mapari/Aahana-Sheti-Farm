import { supabase } from "./supabaseClient";

// 📝 TABLE NAMES: 'farmers' and 'work_logs'

// GENERIC HELPERS
export const addData = async (tableName, data) => {
    if (!supabase) {
        console.warn("Supabase not connected. Data not saved.");
        return data;
    }

    const { data: result, error } = await supabase
        .from(tableName)
        .insert([data])
        .select();

    if (error) {
        console.error(`Error adding to ${tableName}:`, error);
        throw error;
    }
    return result[0];
};

export const getData = async (tableName) => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        throw error;
    }
    return data || [];
};

export const getDocumentById = async (tableName, id) => {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching ${tableName} by ID:`, error);
        return null;
    }
    return data;
};

export const deleteData = async (tableName, id) => {
    if (!supabase) {
        console.warn("Supabase not connected. Delete not possible.");
        return null;
    }

    const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting from ${tableName}:`, error);
        throw error;
    }
    return true;
};
