import './EventCard.css';

function EventCard({ event }) {
    return (
        <div className="event-card">
            <h2>{event.name}</h2>
            <p>📅 {new Date(event.date).toLocaleDateString('es-AR')}</p>
            <p>⏰ {new Date(event.date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
            <p>🏠 {event.location}</p>
            <p>{event.description}</p>
            <button>Ver mas</button>
        </div>
    );
}

export default EventCard;