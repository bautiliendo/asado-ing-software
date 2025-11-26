import { useState, useEffect } from 'react';
import EventCard from '../EventCard/EventCard';
import Modal from '../Modal/Modal';
import EventForm from '../EventForm/EventForm';
import { getAllEvents, createEvent } from '../../services/eventService';
import './Inicio.css';

function Inicio() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAllEvents()
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al traer los eventos:', error);
                setLoading(false);
            })
    }, [])

    const handleCreateEvent = async (formData) => {
        try {
            const newEvent = await createEvent(formData);

            setEvents([...events, newEvent]);
            setIsModalOpen(false);
            console.log('Evento creado:', newEvent);
        } catch (error) {
            console.error('Error al crear el evento:', error);
        }
    };

    if (loading) {
        return <div>Cargando eventos...</div>
    }

    return (
        <div className="inicio-container">
            <div className="header-section">
                <h1>Eventos</h1>
                <button
                    className="add-event-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Agregar Evento
                </button>
            </div>

            <div className="events-grid">
                {
                    events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))
                }
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                <EventForm onSubmit={handleCreateEvent} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}

export default Inicio;