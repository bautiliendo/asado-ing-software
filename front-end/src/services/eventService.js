
export const getAllEvents = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/events');

        if (!response.ok) {
            throw new Error('Error al traer los eventos');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        });

        if (!response.ok) {
            throw new Error('Error al crear el evento');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el evento:', error);
        throw error;
    }
};