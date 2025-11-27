import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteEvent, updateEvent } from "../../services/eventService";
import Modal from "../Modal/Modal";
import EventForm from "../EventForm/EventForm";
import GuestList from "../GuestList/GuestList";
import "./Event.css";

function Event() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/events/${id}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async (formData) => {
        try {
            const updatedEvent = await updateEvent(id, formData);
            setEvent(updatedEvent);
            setIsEditing(false);
            alert('Evento actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
            alert('Error al actualizar el evento');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
            try {
                await deleteEvent(id);
                alert('Evento eliminado exitosamente');
                navigate('/');
            } catch (error) {
                console.error('Error al eliminar el evento:', error);
                alert('Error al eliminar el evento');
            }
        }
    };

    return (
        <div className="event-detail">
            {loading ? (
                <p>Cargando evento...</p>
            ) : event ? (
                <div className="event-content">
                    <Link to="/" className="back-arrow">
                        ← Volver
                    </Link>
                    <div className="event-info">
                        <h1>{event.name}</h1>
                        <p><strong>📅 Fecha:</strong> {new Date(event.date).toLocaleDateString('es-AR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                        <p><strong>⏰ Hora:</strong> {new Date(event.date).toLocaleTimeString('es-AR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}</p>
                        <p><strong>📍 Ubicación:</strong> {event.location}</p>
                        <p><strong>📝 Descripción:</strong> {event.description}</p>

                        <div className="button-group">
                            <button onClick={handleEdit} className="edit-button">Editar Evento</button>
                            <button onClick={handleDelete} className="delete-button">Eliminar Evento</button>
                        </div>
                    </div>

                    <GuestList eventId={id} />
                </div>
            ) : (
                <p>No se encontró el evento</p>
            )}

            <Modal isOpen={isEditing} onClose={handleCancelEdit}>
                <EventForm
                    onSubmit={handleSaveEdit}
                    onCancel={handleCancelEdit}
                    initialData={event}
                    isEditing={true}
                />
            </Modal>
        </div>
    );
}

export default Event;