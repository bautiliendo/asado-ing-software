import { useState } from 'react';
import './EventForm.css';

function EventForm({ onSubmit, onCancel, initialData = null, isEditing = false }) {
    const [formData, setFormData] = useState(
        initialData ? {
            name: initialData.name,
            date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
            location: initialData.location,
            description: initialData.description || ''
        } : {
            name: '',
            date: '',
            location: '',
            description: ''
        }
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Editar Evento' : 'Nuevo Evento'}</h2>

            <div className="form-group">
                <label>Nombre del evento *</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength="50"
                    required
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora *</label>
                <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Lugar *</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    maxLength="50"
                    required
                />
            </div>

            <div className="form-group">
                <label>Descripción</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    maxLength="100"
                />
            </div>

            <div className="form-buttons">
                <button type="button" onClick={onCancel} className="btn-cancel">
                    Cancelar
                </button>
                <button type="submit" className="btn-submit">
                    {isEditing ? 'Guardar Cambios' : 'Crear Evento'}
                </button>
            </div>
        </form>
    );
}

export default EventForm;