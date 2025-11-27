
export const getAllGuests = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/guests');

        if (!response.ok) {
            throw new Error('Error al traer los invitados');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const createGuest = async (guestData) => {
    try {
        const response = await fetch('http://localhost:3000/api/guests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guestData)
        });

        if (!response.ok) {
            throw new Error('Error al crear el invitado');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el invitado:', error);
        throw error;
    }
};