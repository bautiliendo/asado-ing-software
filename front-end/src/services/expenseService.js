const API_URL = 'http://localhost:3000/api/expenses';

export const getAllExpenses = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Error al traer los gastos');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getExpensesByEventId = async (eventId) => {
    try {
        // Asegurar que eventId sea un número
        const numericEventId = parseInt(eventId, 10);
        const url = `${API_URL}?eventId=${numericEventId}`;
        console.log('🌐 Llamando a URL:', url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al traer los gastos del evento');
        }

        const data = await response.json();
        console.log('📦 Respuesta del backend:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const createExpense = async (expenseData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData)
        });

        if (!response.ok) {
            throw new Error('Error al crear el gasto');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el gasto:', error);
        throw error;
    }
};

export const updateExpense = async (expenseId, expenseData) => {
    try {
        const response = await fetch(`${API_URL}/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el gasto');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el gasto:', error);
        throw error;
    }
};

export const deleteExpense = async (expenseId) => {
    try {
        const response = await fetch(`${API_URL}/${expenseId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el gasto');
        }

        return { success: true };
    } catch (error) {
        console.error('Error al eliminar el gasto:', error);
        throw error;
    }
};